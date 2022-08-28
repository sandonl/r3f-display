import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Section } from "./components/section";
import Header from "./components/header";

import { Html, useGLTF } from "@react-three/drei";
import state from "./components/state";

import { useInView } from "react-intersection-observer";
import { Loader } from "./components/loader";
import Footer from "./components/footer";

const Model = ({ modelPath }) => {
  const gltf = useGLTF(modelPath, true);
  return <primitive object={gltf.scene} dispose={null} />;
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 20, 5]} intensity={1} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <spotLight position={[0, 1000, 0]} intensity={1} />
    </>
  );
};

const HTMLContent = ({
  bgColor,
  domContent,
  children,
  modelPath,
  positionY,
}) => {
  const ref = useRef();

  // Rotation of the chair
  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });
  const [refItem, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, -35, 0]}>
          <Model modelPath={modelPath} />
        </mesh>
        <Html portal={domContent} fullscreen>
          <div className="container" ref={refItem}>
            {children}
          </div>
        </Html>
      </group>
    </Section>
  );
};

function App() {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);

  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <Header />

      <Canvas camera={{ position: [0, 0, 120], fov: 70 }}>
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            domContent={domContent}
            modelPath="/armchairYellow.gltf"
            positionY={250}
            bgColor={"#a3d6d2"}
          >
            <h1 className="title">Yellow</h1>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            modelPath="/armchairGreen.gltf"
            positionY={0}
            bgColor={"#de78a2"}
          >
            <h1 className="title"> Green </h1>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            modelPath="/armchairGray.gltf"
            positionY={-250}
            bgColor={"#41436A"}
          >
            <h1 className="title"> Grey </h1>
          </HTMLContent>
        </Suspense>
      </Canvas>
      <Loader />

      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div className="scrollTop" ref={domContent}></div>
        <div style={{ height: `${state.sections * 100}vh` }}></div>
      </div>
      <Footer />
    </>
  );
}

export default App;
