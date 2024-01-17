import useSpline from "@splinetool/r3f-spline";
import {
  OrthographicCamera,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import { useRef, Suspense, useState } from "react";

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/eIdSkGLuU4hFFyA2/scene.splinecode"
  );
  return (
    <>
      <Suspense fallback={null}>
        <group {...props} dispose={null}>
          <directionalLight
            name="Directional Light 2"
            castShadow
            intensity={1}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            shadow-camera-left={-1000}
            shadow-camera-right={1000}
            shadow-camera-top={1000}
            shadow-camera-bottom={-1000}
            position={[0, 0, 0]}
            scale={[1, 1, 0.47]}
          />
          <mesh
            name="Boolean 7"
            geometry={nodes["Boolean 7"].geometry}
            material={nodes["Boolean 7"].material}
            castShadow
            receiveShadow
            position={[0, 0, 0]}
            rotation={[0, 0, 3.12]}
            scale={[1.07, 1.24, 1]}
          />
          <mesh
            name="Boolean 6"
            geometry={nodes["Boolean 6"].geometry}
            material={nodes["Boolean 6"].material}
            castShadow
            receiveShadow
            position={[0, 0, 0]}
            scale={[1.07, 1.24, 1]}
          />
          <mesh
            name="Boolean 5"
            geometry={nodes["Boolean 5"].geometry}
            material={nodes["Boolean 5"].material}
            castShadow
            receiveShadow
            position={[0, 0, 0]}
          />
          <mesh
            name="Boolean 2"
            geometry={nodes["Boolean 2"].geometry}
            material={nodes["Boolean 2"].material}
            castShadow
            receiveShadow
            position={[0, 0, 0]}
          />
          <directionalLight
            name="Directional Light"
            castShadow
            intensity={0.7}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            shadow-camera-left={-1000}
            shadow-camera-right={1000}
            shadow-camera-top={1000}
            shadow-camera-bottom={-1000}
            position={[77.99, -82.93, 300]}
          />
          <PerspectiveCamera
            name="1"
            makeDefault={true}
            zoom={13}
            far={100000}
            near={70}
            fov={45}
            position={[208.41, 99.44, 844.79]}
            rotation={[-0.1, 0.24, 0.02]}
          />
          <hemisphereLight
            name="Default Ambient Light"
            intensity={0.75}
            color="#eaeaea"
          />
        </group>
        <OrbitControls enableZoom={false} autoRotate={true} />
      </Suspense>
    </>
  );
}
