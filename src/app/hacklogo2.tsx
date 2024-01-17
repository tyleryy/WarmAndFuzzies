import useSpline from "@splinetool/r3f-spline";
import {
  OrthographicCamera,
  PerspectiveCamera,
  OrbitControls,
  Stars,
  Sparkles,
} from "@react-three/drei";
import { useRef, Suspense, useState } from "react";

export default function HackLogoV2({ ...props }) {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/FrkCjMUiS99NDkc7/scene.splinecode"
  );

  const [rotate, setRotate] = useState(true);
  return (
    <>
      <Suspense fallback={null}>
        {/* <Sky/>
        <color attach="background" args={['#000000']} /> */}

        <group
          {...props}
          dispose={null}
          onClick={(e) => setRotate(false)}
          position={[0, -10, 0]}
        >
          <Stars
            radius={100}
            depth={30}
            count={2500}
            factor={10}
            saturation={0}
            speed={1}
          />
          <Sparkles
            color="teal"
            count={80}
            noise={1}
            size={300}
            opacity={1}
            speed={1.8}
            scale={180}
            position={[0, 0, 0]}
          />
          <Sparkles
            color="orange"
            count={80}
            noise={1}
            size={800}
            opacity={1}
            speed={1.8}
            scale={180}
            position={[0, 0, 0]}
          />
          <Sparkles
            color="red"
            count={80}
            noise={1}
            size={300}
            opacity={1}
            speed={1.8}
            scale={180}
            position={[0, 0, 0]}
          />
          <Sparkles
            color="purple"
            count={100}
            noise={1}
            size={500}
            opacity={1}
            speed={1.8}
            scale={180}
            position={[0, 0, 0]}
          />
          <Sparkles
            color="green"
            count={80}
            noise={1}
            size={500}
            opacity={1}
            speed={1.8}
            scale={180}
            position={[0, 0, 0]}
          />
          {/* <Cloud
            opacity={0.8}
            speed={0.4} // Rotation speed
            width={10} // Width of the full cloud
            depth={1} // Z-dir depth
            segments={50} // Number of particles
            position={[0,-15,0]}
            /> */}
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
            name="Boolean 2"
            geometry={nodes["Boolean 2"].geometry}
            material={nodes["Boolean 2"].material}
            castShadow
            receiveShadow
            position={[0, 0, 0]}
          />
          <mesh
            name="Cylinder"
            geometry={nodes.Cylinder.geometry}
            material={materials["Cylinder Material"]}
            castShadow
            receiveShadow
            position={[0, 0, 0]}
            rotation={[1.57, 0, 0]}
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
          <OrthographicCamera
            name="1"
            makeDefault={true}
            zoom={8}
            far={100000}
            near={-100000}
            position={[-611.99, 309.98, -762.44]}
            rotation={[-2.75, -0.65, -2.9]}
            scale={1}
          />
          <hemisphereLight
            name="Default Ambient Light"
            intensity={0.75}
            color="#eaeaea"
          />
          <OrbitControls
            enableZoom={false}
            autoRotate={rotate}
            enablePan={false}
          />
        </group>
      </Suspense>
    </>
  );
}
