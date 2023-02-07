import React, { Suspense, useRef, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import {
  Center,
  OrbitControls,
  Plane,
  softShadows,
  Stage,
} from "@react-three/drei";
import data from "../data/mockup1.js";
import Header from "../components/Header";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { Text } from "troika-three-text";
import { Vector3 } from "three";

softShadows();

extend({ Text });

function Cube({ color, position, scale, thisText }) {
  const mesh = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const [opts, setOpts] = useState({
    font: "Roboto",
    fontSize: 0.5,
    color: "#000",
    maxWidth: 300,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: "justify",
    materialType: "MeshPhongMaterial",
  });

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
          color={color}
          opacity={hovered ? 0.9 : [0.7]}
          transparent
        />
        {hovered && (
          <text
            position-z={1}
            position-x={0}
            position-y={1}
            {...opts}
            text={thisText}
            font={"roboto"}
            anchorX="center"
            anchorY="middle"
          >
            {opts.materialType === "MeshPhongMaterial" ? (
              <meshPhongMaterial attach="material" color={opts.color} />
            ) : null}
          </text>
        )}
      </mesh>
    </>
  );
}

const Home = () => {
  const dataSet = data.length;
  const origin = new Vector3();
  return (
    <>
      <Header />
      <Canvas
        style={{ backgroundColor: "gray", height: "100vh" }}
        colorManagement
        shadowMap
        camera={{ position: [-5, 10, 30], fov: 60 }}
        vr
        onCreated={({ gl }) =>
          document.body.appendChild(VRButton.createButton(gl))
        }
      >
        <Suspense fallback={null}>
          <Stage
            contactShadowOpacity={0.001}
            shadowBias={-0.0015}
            intensity={1}
            environment={null}
          >
            <ambientLight intensity={0.2} />

            <group>
              <Center position={[0, 15, 10]}>
                {data.map((item) => (
                  <Cube
                    key={item.id}
                    position={[item.id, origin.y - 5, 3]}
                    scale={[1, item.height / 30, 1]}
                    color={item.color}
                    thisText={item.height}
                  />
                ))}
              </Center>
              <gridHelper args={[dataSet, dataSet, 0xff0000, 0x555555]} />
            </group>
          </Stage>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default Home;
