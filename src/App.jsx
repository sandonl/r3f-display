import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Section } from "./components/section";
import Header from "./components/header";

import { Html, useGLTF } from "@react-three/drei";

const Model = () => {
  const gltf = useGLTF("/armchairYellow.gltf", true);
  return <primitive object={gltf.scene} dispose={null} />;
};

const Lights = () => {
  return <ambientLight intensity={0.4} />;
};

const HTMLContent = () => {
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, 250, 0]}>
        <mesh position={[0, -35, 0]}>
          <Model />
        </mesh>
        <Html fullscreen>
          <div className="container">
            <h1 className="title"> Hello </h1>
          </div>
        </Html>
      </group>
    </Section>
  );
};

function App() {
  return (
    <>
      <Header />
      <Canvas camera={{ position: [0, 0, 120], fov: 70 }}>
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
