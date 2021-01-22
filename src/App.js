import React, { useRef } from 'react';
import './App.scss';

import { Canvas, useFrame } from 'react-three-fiber';
import { softShadows, MeshWobbleMaterial } from "drei";

softShadows();

const SpinningMesh = ( {position, args, color} ) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return(
  <mesh castShadow position={position} ref={mesh}>
    <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
    <MeshWobbleMaterial 
    attach='material' 
    color='pink' 
    speed={1} 
    factor={0.6}/>
  </mesh>
  )
}

function App() {
  return (
<>
  <Canvas
   shadowMap
   colorManagement camera={{ position: [-5, 2, 10], fov: 60}}>
    <pointLight position={[-10, 0, -20]} intensity={0.5} />
    <pointLight position={[0, -10, 0]} intensity={1} />
    <ambientLight intensity={0.35} />
    <directionalLight
    castShadow
    position={[0, 10, 0]} 
    intensity={1.5} 
    shadow-mapSize-width={1024} 
    shadow-mapSize-height={1024}
    shadow-camera-far={50}
    shadow-camera-left={-10}
    shadow-camera-right={10}
    shadow-camera-top={10}
    shadow-camera-bottom={-10} />
    <SpinningMesh position={[0, 1, 0]} />
    <SpinningMesh position={[-2, 1, -5]} />
    <SpinningMesh position={[5, 1, -2]} />

    <group>
      <mesh 
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -3, 0]}>
        <planeBufferGeometry attach='geometry' args={[100, 100]} />
        <shadowMaterial attach='material' opacity={0.3} />
      </mesh>
    </group>
  </Canvas>
</>
  );
}

export default App;
