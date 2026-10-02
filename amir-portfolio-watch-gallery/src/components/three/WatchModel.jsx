import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";

function WatchModel() {
  const watchRef = useRef();

  useFrame((state) => {
    if (!watchRef.current) return;

    const time = state.clock.elapsedTime;

    watchRef.current.rotation.y =
      Math.sin(time * 0.35) * 0.18;

    watchRef.current.rotation.x =
      Math.sin(time * 0.25) * 0.05;
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.12}
      floatIntensity={0.45}
    >
      <group
        ref={watchRef}
        rotation={[0.15, -0.25, 0]}
        scale={1.15}
      >

        {/* قاب ساعت */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.15, 1.15, 0.28, 64]} />
          <meshStandardMaterial
            color="#171a20"
            metalness={0.95}
            roughness={0.18}
          />
        </mesh>

        {/* صفحه */}
        <mesh
          position={[0, 0, 0.17]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.92, 0.92, 0.06, 64]} />
          <meshStandardMaterial
            color="#090b0f"
            metalness={0.55}
            roughness={0.3}
          />
        </mesh>

        {/* حلقه طلایی */}
        <mesh
          position={[0, 0, 0.22]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.94, 0.045, 16, 64]} />
          <meshStandardMaterial
            color="#d6b36a"
            metalness={0.95}
            roughness={0.18}
          />
        </mesh>

        {/* عقربه دقیقه */}
        <mesh
          position={[0, 0.24, 0.30]}
          scale={[0.035, 0.5, 0.025]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#f4f1ea"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* عقربه ساعت */}
        <mesh
          position={[-0.15, 0.25, 0.27]}
          rotation={[0, 0, -0.8]}
          scale={[0.04, 0.35, 0.025]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#d6b36a"
            metalness={0.9}
            roughness={0.18}
          />
        </mesh>

        {/* مرکز عقربه‌ها */}
        <mesh position={[0, 0.28, 0.34]}>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshStandardMaterial
            color="#d6b36a"
            metalness={1}
            roughness={0.15}
          />
        </mesh>

        {/* بند بالا */}
        <mesh position={[0, 1.65, 0]}>
          <boxGeometry args={[0.65, 1.4, 0.28]} />
          <meshStandardMaterial
            color="#111318"
            metalness={0.45}
            roughness={0.35}
          />
        </mesh>

        {/* بند پایین */}
        <mesh position={[0, -1.65, 0]}>
          <boxGeometry args={[0.65, 1.4, 0.28]} />
          <meshStandardMaterial
            color="#111318"
            metalness={0.45}
            roughness={0.35}
          />
        </mesh>

        {/* تاج */}
        <mesh
          position={[1.27, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.14, 0.14, 0.28, 24]} />
          <meshStandardMaterial
            color="#d6b36a"
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>

      </group>
    </Float>
  );
}

export default WatchModel;