
import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, Suspense} from 'react'

export default function Cube3D () {
    const ref = useRef()
    useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))
    
    return (
            <Suspense fallback={null}>

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <mesh 
                ref={ref}
                // rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25}
            >
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                <meshNormalMaterial/>
            </mesh>
            <OrbitControls
                enableZoom={false} autoRotate={true}/>
            </Suspense>
    )
}
