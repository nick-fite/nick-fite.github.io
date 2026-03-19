import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, type ThreeElements} from '@react-three/fiber'
import { Card } from 'antd'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'


// imperatively, all uniforms are available as setter/getters and constructor args
function Box(props: ThreeElements['group']) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [object, setObject] = useState<THREE.Group | null>(null)

  useEffect(() => {
    const loader = new OBJLoader()
    loader.load('/gamecubeController.obj', (loaded) => {
      setObject(loaded)
    })
  }, [])

  useFrame((_, delta) => {
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
