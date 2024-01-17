import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense, useState } from "react";

export default function Cube3D() {
  const ref: any = useRef();
  const [rotateSpeed, changeSpeed] = useState(0.01);
  useFrame(
    () => (ref.current.rotation.x = ref.current.rotation.y += rotateSpeed)
  );

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <mesh
        ref={ref}
        onClick={(e) => changeSpeed(0)}
        // rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25}
      >
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshNormalMaterial />
      </mesh>
      <OrbitControls enableZoom={false} autoRotate={true} />
    </Suspense>
  );
}
