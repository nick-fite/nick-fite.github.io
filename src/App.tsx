import * as THREE from 'three'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, type ThreeElements} from '@react-three/fiber'
import { Card } from 'antd'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'

const vertexShader = `
  uniform float uTime;
  uniform float uActive;
  varying float vWave;
  varying vec3 vNormal;

  void main() {
    vNormal = normalize(normalMatrix * normal);

    vec3 transformed = position;
    float wave = sin(transformed.y * 8.0 + uTime * 2.0) * (0.04 + uActive * 0.06);
    transformed += normal * wave;
    vWave = wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform float uHover;
  varying float vWave;
  varying vec3 vNormal;

  void main() {
    vec3 normalColor = normalize(vNormal) * 0.5 + 0.5;
    vec3 base = mix(vec3(0.10, 0.45, 0.95), vec3(1.0, 0.25, 0.65), uHover);
    float pulse = 0.7 + 0.3 * sin(uTime * 3.0 + vWave * 18.0);
    vec3 color = mix(base, normalColor, 0.35) * pulse;
    gl_FragColor = vec4(color, 1.0);
  }
`


// imperatively, all uniforms are available as setter/getters and constructor args
function Box(props: ThreeElements['group']) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [object, setObject] = useState<THREE.Group | null>(null)
  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uHover: { value: 0 },
          uActive: { value: 0 },
        },
      }),
    []
  )

  useEffect(() => {
    const loader = new OBJLoader()
    loader.load('/gamecubeController.obj', (loaded) => {
      loaded.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = shaderMaterial
        }
      })
      setObject(loaded)
    })
    return () => {
      shaderMaterial.dispose()
    }
  }, [shaderMaterial])

  useFrame((_, delta) => {
    shaderMaterial.uniforms.uTime.value += delta
    shaderMaterial.uniforms.uHover.value = hovered ? 1 : 0
    shaderMaterial.uniforms.uActive.value = active ? 1 : 0

    if (groupRef.current) {
      groupRef.current.rotation.x += delta
    }
  })

  if (!object) return null

  return (
    <group
      {...props}
      ref={groupRef}
      scale={active ? .08 : .04}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <primitive object={object} />
    </group>
  )
}

function App() {

  return (
    <Card style={{backgroundColor: "#242424", borderColor: "#343434", height: "50%"}} styles={{body: {padding: 0, height: "100%"}}}>
      <div style={{height: "100%", width: "100%"}}>
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </div>
    </Card>
  )
}

export default App
