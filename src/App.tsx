import * as THREE from 'three'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'
import './App.css'

function MiddleMouseOrbit() {
  const { camera, gl } = useThree()
  const orbitingRef = useRef(false)
  const pointerRef = useRef({ x: 0, y: 0 })
  const sphericalRef = useRef(new THREE.Spherical())
  const targetRef = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    const element = gl.domElement
    const minPhi = 0.25
    const maxPhi = Math.PI - 0.25
    const rotateSpeed = 0.008

    sphericalRef.current.setFromVector3(camera.position.clone().sub(targetRef.current))

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 1) {
        return
      }

      event.preventDefault()
      orbitingRef.current = true
      pointerRef.current = { x: event.clientX, y: event.clientY }
      element.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!orbitingRef.current) {
        return
      }

      const dx = event.clientX - pointerRef.current.x
      const dy = event.clientY - pointerRef.current.y

      pointerRef.current = { x: event.clientX, y: event.clientY }

      sphericalRef.current.theta -= dx * rotateSpeed
      sphericalRef.current.phi = THREE.MathUtils.clamp(
        sphericalRef.current.phi + dy * rotateSpeed,
        minPhi,
        maxPhi
      )

      const nextPosition = new THREE.Vector3()
        .setFromSpherical(sphericalRef.current)
        .add(targetRef.current)

      camera.position.copy(nextPosition)
      camera.lookAt(targetRef.current)
    }

    const endOrbit = (event: PointerEvent) => {
      if (!orbitingRef.current) {
        return
      }

      orbitingRef.current = false
      if (element.hasPointerCapture(event.pointerId)) {
        element.releasePointerCapture(event.pointerId)
      }
    }

    const preventMiddleScroll = (event: MouseEvent) => {
      if (event.button === 1) {
        event.preventDefault()
      }
    }

    element.addEventListener('pointerdown', onPointerDown)
    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerup', endOrbit)
    element.addEventListener('pointerleave', endOrbit)
    element.addEventListener('mousedown', preventMiddleScroll)

    return () => {
      element.removeEventListener('pointerdown', onPointerDown)
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerup', endOrbit)
      element.removeEventListener('pointerleave', endOrbit)
      element.removeEventListener('mousedown', preventMiddleScroll)
    }
  }, [camera, gl])

  return null
}

type SculptableSphereProps = {
  onHudChange: (label: string) => void
}

function SculptableSphere({ onHudChange }: SculptableSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const draggingRef = useRef(false)
  const sculptDirectionRef = useRef<1 | -1>(1)
  const transitioningRef = useRef(false)
  const transitionProgressRef = useRef(0)
  const targetControllerRef = useRef(false)
  const isControllerRef = useRef(false)
  const morphStateRef = useRef<{
    geometry: THREE.BufferGeometry
    positionAttr: THREE.BufferAttribute
    sourcePositions: Float32Array
    targetPositions: Float32Array
  } | null>(null)

  const spherePristineRef = useRef<THREE.BufferGeometry | null>(null)
  const controllerPristineRef = useRef<THREE.BufferGeometry | null>(null)
  const sculptDataRef = useRef<{ baseRadii: Float32Array; neighbors: number[][] } | null>(null)

  const { camera, pointer } = useThree()
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const localHit = useMemo(() => new THREE.Vector3(), [])
  const vertex = useMemo(() => new THREE.Vector3(), [])
  const normal = useMemo(() => new THREE.Vector3(), [])
  const neighborAverage = useMemo(() => new THREE.Vector3(), [])
  const blendedVertex = useMemo(() => new THREE.Vector3(), [])
  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1.1, 72, 72), [])

  const buildSculptData = (geometry: THREE.BufferGeometry) => {
    const positions = geometry.attributes.position as THREE.BufferAttribute
    const baseRadii = new Float32Array(positions.count)
    for (let i = 0; i < positions.count; i += 1) {
      vertex.fromBufferAttribute(positions, i)
      baseRadii[i] = vertex.length()
    }

    const neighbors = Array.from({ length: positions.count }, () => new Set<number>())
    const index = geometry.index

    if (index) {
      const arr = index.array as ArrayLike<number>
      for (let i = 0; i < arr.length; i += 3) {
        const a = arr[i]
        const b = arr[i + 1]
        const c = arr[i + 2]
        neighbors[a].add(b)
        neighbors[a].add(c)
        neighbors[b].add(a)
        neighbors[b].add(c)
        neighbors[c].add(a)
        neighbors[c].add(b)
      }
    } else {
      for (let i = 0; i + 2 < positions.count; i += 3) {
        const a = i
        const b = i + 1
        const c = i + 2
        neighbors[a].add(b)
        neighbors[a].add(c)
        neighbors[b].add(a)
        neighbors[b].add(c)
        neighbors[c].add(a)
        neighbors[c].add(b)
      }
    }

    return { baseRadii, neighbors: neighbors.map((set) => Array.from(set)) }
  }

  const activateGeometry = (nextGeometry: THREE.BufferGeometry) => {
    const mesh = meshRef.current
    if (!mesh) {
      return
    }

    mesh.geometry = nextGeometry
    sculptDataRef.current = buildSculptData(nextGeometry)
  }

  const mapSourceToTargetPositions = (
    sourceAttr: THREE.BufferAttribute,
    targetAttr: THREE.BufferAttribute
  ) => {
    const mapped = new Float32Array(targetAttr.count * 3)

    for (let targetIndex = 0; targetIndex < targetAttr.count; targetIndex += 1) {
      const tx = targetAttr.getX(targetIndex)
      const ty = targetAttr.getY(targetIndex)
      const tz = targetAttr.getZ(targetIndex)

      let closestSourceIndex = 0
      let bestDistanceSq = Number.POSITIVE_INFINITY

      for (let sourceIndex = 0; sourceIndex < sourceAttr.count; sourceIndex += 1) {
        const dx = sourceAttr.getX(sourceIndex) - tx
        const dy = sourceAttr.getY(sourceIndex) - ty
        const dz = sourceAttr.getZ(sourceIndex) - tz
        const distanceSq = dx * dx + dy * dy + dz * dz

        if (distanceSq < bestDistanceSq) {
          bestDistanceSq = distanceSq
          closestSourceIndex = sourceIndex
        }
      }

      const writeOffset = targetIndex * 3
      mapped[writeOffset] = sourceAttr.getX(closestSourceIndex)
      mapped[writeOffset + 1] = sourceAttr.getY(closestSourceIndex)
      mapped[writeOffset + 2] = sourceAttr.getZ(closestSourceIndex)
    }

    return mapped
  }

  useEffect(() => {
    spherePristineRef.current = sphereGeometry.clone()
    sculptDataRef.current = buildSculptData(sphereGeometry)

    const loader = new OBJLoader()
    let cancelled = false

    loader.load('/gamecubeController.obj', (objGroup) => {
      if (cancelled) {
        return
      }

      objGroup.updateMatrixWorld(true)
      const bounds = new THREE.Box3().setFromObject(objGroup)
      const center = bounds.getCenter(new THREE.Vector3())
      const size = bounds.getSize(new THREE.Vector3())
      const maxExtent = Math.max(size.x, size.y, size.z)
      const fitScale = maxExtent > 0 ? 2.2 / maxExtent : 1
      const normalizeMatrix = new THREE.Matrix4()
        .makeScale(fitScale, fitScale, fitScale)
        .multiply(new THREE.Matrix4().makeTranslation(-center.x, -center.y, -center.z))

      const partGeometries: THREE.BufferGeometry[] = []

      objGroup.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) {
          return
        }

        const mesh = child as THREE.Mesh
        const geometry = (mesh.geometry as THREE.BufferGeometry).clone()
        const transform = new THREE.Matrix4().multiplyMatrices(normalizeMatrix, mesh.matrixWorld)
        geometry.applyMatrix4(transform)

        const positionAttr = geometry.attributes.position as THREE.BufferAttribute | undefined
        if (!positionAttr) {
          geometry.dispose()
          return
        }

        const normalAttr = geometry.attributes.normal as THREE.BufferAttribute | undefined
        if (!normalAttr) {
          geometry.computeVertexNormals()
        }

        partGeometries.push(geometry)
      })

      if (partGeometries.length === 0) {
        return
      }

      const mergedGeometry = mergeGeometries(partGeometries, false)
      for (let i = 0; i < partGeometries.length; i += 1) {
        partGeometries[i].dispose()
      }

      if (!mergedGeometry) {
        return
      }

      // Welding creates shared topology so brush smoothing can propagate across faces.
      const weldedGeometry = mergeVertices(mergedGeometry, 0.0008)
      mergedGeometry.dispose()

      weldedGeometry.computeVertexNormals()

      controllerPristineRef.current = weldedGeometry
    })

    return () => {
      cancelled = true
    }
  }, [sphereGeometry])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '6' || transitioningRef.current) {
        return
      }

      if (!spherePristineRef.current || !controllerPristineRef.current) {
        return
      }

      const mesh = meshRef.current
      if (!mesh) {
        return
      }

      targetControllerRef.current = !isControllerRef.current
      const targetPristine = targetControllerRef.current
        ? controllerPristineRef.current
        : spherePristineRef.current

      if (!targetPristine) {
        return
      }

      const sourceGeometry = mesh.geometry as THREE.BufferGeometry
      const sourceAttr = sourceGeometry.attributes.position as THREE.BufferAttribute
      const morphGeometry = targetPristine.clone()
      const targetAttr = morphGeometry.attributes.position as THREE.BufferAttribute
      const sourcePositions = mapSourceToTargetPositions(sourceAttr, targetAttr)
      const targetPositions = new Float32Array(targetAttr.array as ArrayLike<number>)

      for (let i = 0; i < targetAttr.count; i += 1) {
        const readOffset = i * 3
        targetAttr.setXYZ(
          i,
          sourcePositions[readOffset],
          sourcePositions[readOffset + 1],
          sourcePositions[readOffset + 2]
        )
      }

      targetAttr.needsUpdate = true
      morphGeometry.computeVertexNormals()
      const morphNormals = morphGeometry.attributes.normal as THREE.BufferAttribute | undefined
      if (morphNormals) {
        morphNormals.needsUpdate = true
      }

      activateGeometry(morphGeometry)
      morphStateRef.current = {
        geometry: morphGeometry,
        positionAttr: targetAttr,
        sourcePositions,
        targetPositions,
      }

      transitionProgressRef.current = 0
      transitioningRef.current = true
      onHudChange(targetControllerRef.current ? 'Morphing to Controller' : 'Morphing to Sphere')
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onHudChange])

  const clampVertexRadius = (targetVertex: THREE.Vector3, vertexIndex: number) => {
    if (isControllerRef.current) {
      return
    }

    const sculptData = sculptDataRef.current
    if (!sculptData) {
      return
    }

    const baseRadius = sculptData.baseRadii[vertexIndex] ?? targetVertex.length()
    const minRadius = baseRadius * 0.58
    const maxRadius = baseRadius * 1.9
    const clampedRadius = THREE.MathUtils.clamp(targetVertex.length(), minRadius, maxRadius)

    targetVertex.setLength(clampedRadius)
  }

  const sculptAtPoint = (hitWorld: THREE.Vector3, strengthScale: number) => {
    const mesh = meshRef.current
    if (!mesh) {
      return
    }

    const geometry = mesh.geometry as THREE.BufferGeometry
    const positions = geometry.attributes.position as THREE.BufferAttribute
    const normals = geometry.attributes.normal as THREE.BufferAttribute
    const sculptData = sculptDataRef.current

    if (!sculptData) {
      return
    }

    localHit.copy(hitWorld)
    mesh.worldToLocal(localHit)

    const radius = isControllerRef.current ? 0.11 : 0.22
    const strength = (isControllerRef.current ? 0.02 : 0.035) * strengthScale
    const affectedIndices: number[] = []

    for (let i = 0; i < positions.count; i += 1) {
      vertex.fromBufferAttribute(positions, i)
      const distance = vertex.distanceTo(localHit)

      if (distance > radius) {
        continue
      }

      const falloff = Math.pow(1 - distance / radius, 2)
      normal.fromBufferAttribute(normals, i).normalize()
      vertex.addScaledVector(normal, strength * falloff * sculptDirectionRef.current)
      clampVertexRadius(vertex, i)
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z)
      affectedIndices.push(i)
    }

    const smoothing = isControllerRef.current ? 0.08 : 0.2
    if (affectedIndices.length > 0) {
      const stagedPositions = new Float32Array(affectedIndices.length * 3)

      for (let i = 0; i < affectedIndices.length; i += 1) {
        const index = affectedIndices[i]
        const neighbors = sculptData.neighbors[index] ?? []

        if (neighbors.length === 0) {
          vertex.fromBufferAttribute(positions, index)
          stagedPositions[i * 3] = vertex.x
          stagedPositions[i * 3 + 1] = vertex.y
          stagedPositions[i * 3 + 2] = vertex.z
          continue
        }

        neighborAverage.set(0, 0, 0)
        for (let j = 0; j < neighbors.length; j += 1) {
          vertex.fromBufferAttribute(positions, neighbors[j])
          neighborAverage.add(vertex)
        }
        neighborAverage.multiplyScalar(1 / neighbors.length)

        vertex.fromBufferAttribute(positions, index)
        blendedVertex.copy(vertex).lerp(neighborAverage, smoothing)
        clampVertexRadius(blendedVertex, index)

        stagedPositions[i * 3] = blendedVertex.x
        stagedPositions[i * 3 + 1] = blendedVertex.y
        stagedPositions[i * 3 + 2] = blendedVertex.z
      }

      for (let i = 0; i < affectedIndices.length; i += 1) {
        const index = affectedIndices[i]
        positions.setXYZ(
          index,
          stagedPositions[i * 3],
          stagedPositions[i * 3 + 1],
          stagedPositions[i * 3 + 2]
        )
      }
    }

    positions.needsUpdate = true
    geometry.computeVertexNormals()
    normals.needsUpdate = true
  }

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh) {
      return
    }

    if (transitioningRef.current) {
      transitionProgressRef.current = Math.min(transitionProgressRef.current + delta / 0.45, 1)
      const material = mesh.material as THREE.MeshStandardMaterial
      const morphState = morphStateRef.current

      if (morphState) {
        const t = transitionProgressRef.current
        const easedT = t * t * (3 - 2 * t)
        const positionArray = morphState.positionAttr.array as Float32Array

        for (let i = 0; i < positionArray.length; i += 1) {
          positionArray[i] = THREE.MathUtils.lerp(
            morphState.sourcePositions[i],
            morphState.targetPositions[i],
            easedT
          )
        }

        morphState.positionAttr.needsUpdate = true
        morphState.geometry.computeVertexNormals()
        const normals = morphState.geometry.attributes.normal as THREE.BufferAttribute | undefined
        if (normals) {
          normals.needsUpdate = true
        }
      }

      if (transitionProgressRef.current >= 1) {
        transitioningRef.current = false
        isControllerRef.current = targetControllerRef.current
        sculptDataRef.current = buildSculptData(mesh.geometry as THREE.BufferGeometry)
        morphStateRef.current = null
        material.opacity = 1
        material.transparent = false
        onHudChange(isControllerRef.current ? 'Controller' : 'Sphere')
      }
      return
    }

    if (!draggingRef.current) {
      return
    }

    raycaster.setFromCamera(pointer, camera)
    const hit = raycaster.intersectObject(mesh, false)[0]

    if (!hit) {
      return
    }

    sculptAtPoint(hit.point, Math.min(delta * 60, 1.6))
  })

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (e.button !== 0 && e.button !== 2) {
      return
    }

    e.stopPropagation()
    const target = e.target as unknown as Element
    if ('setPointerCapture' in target) {
      target.setPointerCapture(e.pointerId)
    }
    draggingRef.current = true
    sculptDirectionRef.current = e.button === 2 ? -1 : 1
  }

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    const target = e.target as unknown as Element
    if ('releasePointerCapture' in target) {
      target.releasePointerCapture(e.pointerId)
    }
    draggingRef.current = false
  }

  return (
    <mesh
      ref={meshRef}
      geometry={sphereGeometry}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerUp}
      onContextMenu={(e) => e.nativeEvent.preventDefault()}
    >
      <meshStandardMaterial color="#7ad7ff" metalness={0.15} roughness={0.32} />
    </mesh>
  )
}

function App() {
  const [hudLabel, setHudLabel] = useState('Sphere')

  return (
    <div className="page-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Interactive Three.js Playground</p>
          <h1>Shape Sculptor</h1>
          <p className="lede">
            Drag to push and carve real-time geometry, rotate with middle mouse, and press 6 to
            toggle between a sphere and a full controller mesh.
          </p>
          <p className="controls">Left drag: Sculpt • Right drag: Carve • Middle mouse: Orbit</p>
        </div>

        <div className="canvas-wrap">
          <div className="hud-badge">Form: {hudLabel}</div>
          <Canvas camera={{ position: [0, 0, 3.4], fov: 55 }}>
            <color attach="background" args={['#0f1218']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[3, 5, 4]} intensity={1.6} />
            <directionalLight position={[-5, -2, 2]} intensity={0.6} color="#b6ccff" />
            <MiddleMouseOrbit />
            <SculptableSphere onHudChange={setHudLabel} />
          </Canvas>
        </div>
      </section>

      <main className="content-column">
        <section className="info-block">
          <h2>What Is Three.js?</h2>
          <p>
            Three.js is a JavaScript library that makes WebGL easier to work with. Instead of
            manually handling raw shader pipelines for every task, it gives you scene graphs,
            cameras, meshes, materials, lights, and loaders so you can build interactive 3D
            experiences quickly.
          </p>
          <p>
            In this project, React Three Fiber sits on top of Three.js and lets React manage scene
            components. That means your camera controls, mesh changes, and user input can all live
            inside a React app without losing low-level rendering power.
          </p>
        </section>

        <section className="info-block">
          <h2>How This Simulation Works</h2>
          <p>
            While you drag, a ray is cast from the camera to the mesh. If it hits, the hit point is
            converted to local space and used as the brush center.
          </p>
          <p>
            The brush checks nearby vertices only. It applies a distance falloff and moves vertices
            along their normals, so left drag pushes out and right drag pulls in.
          </p>
          <p>
            After each stroke, a light smoothing pass averages touched vertices with their
            neighbors. This removes spikes while keeping the shape readable.
          </p>
          <p>
            On the sphere, deformation is clamped to a safe range based on each vertex&apos;s original
            radius, which prevents extreme collapse or stretching.
          </p>
          <p>
            Pressing 6 morphs between sphere and controller. The target mesh is prepared from the
            OBJ, each target vertex is matched to a nearby source vertex, then positions interpolate
            over time with easing. Normals and sculpt neighbor data are rebuilt so lighting and
            brush behavior stay stable after the transition.
          </p>
        </section>

        <section className="info-block">
          <h2>Why This Is Useful</h2>
          <p>
            This style of interaction demonstrates core real-time graphics ideas: mesh mutation,
            event-driven camera navigation, geometry loading, and frame-by-frame updates. It is a
            practical baseline for game tools, digital clay prototypes, and educational 3D UIs.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
