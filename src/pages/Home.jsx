import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, Plane, softShadows } from "@react-three/drei";
import data from "../data/mockup1.js";
import Header from "../components/Header";

softShadows();

function Cube({ color, position, scale }) {
  const mesh = useRef();

  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  return (
    <>
      <mesh
        position={position}
        castShadow
        ref={mesh}
        scale={scale}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      >
        <boxGeometry args={scale} />
        <meshStandardMaterial
          color={hovered ? "white" : color}
          opacity={hovered ? 1 : [0.8]}
          transparent
        />
      </mesh>
    </>
  );
}

const Home = () => {
  return (
    <>
      <Header />
      <Canvas
        style={{ backgroundColor: "gray", height: "100vh" }}
        colorManagement
        shadowMap
        camera={{ position: [-5, 10, 30], fov: 60 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[0, 10, -4]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -30, 0]} intensity={1} />
        <group>
          <gridHelper args={[100, 100]} />
          <Center position={[5, 5, 10]}>
            {data.map((item) => (
              <Cube
                key={item.id}
                position={[item.id, 10, 3]}
                scale={[1, item.height / 40, 1]}
                color={item.color}
              />
            ))}
          </Center>
          <Plane
            receiveShadow
            rotation-x={-Math.PI / 2}
            position={[0, 0, 0]}
            args={[100, 100, 4, 4]}
          ></Plane>
        </group>
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default Home;
