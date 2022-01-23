import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import data from "../data/mockup1.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { WebGL1Renderer } from "three/src/renderers/WebGL1Renderer.js";
import { Center, OrbitControls, PerspectiveCamera } from "@react-three/drei";

function Cube(props) {
  const ref = useRef();

  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame((state, delta) => (ref.current.rotation.x = 0));

  return (
    <>
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 3.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      >
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "#20639b"} />
      </mesh>
    </>
  );
}

function Home(props) {
  return ReactDOM.render(
    <Canvas style={{ backgroundColor: "gray", height: "100vh" }}>
      <PerspectiveCamera makeDefault position={[0, 5, 10]} />
      <group position={[0, 0, -10]}>
        <gridHelper args={[100, 100]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Center position={[5, 5, 10]}>
          {data.map((item) => (
            <Cube key={item.id} position={[item.id - 1.5, 0, 0]} />
          ))}
        </Center>
      </group>
      <OrbitControls />
    </Canvas>,
    document.getElementById("root")
  );
}

export default Home;