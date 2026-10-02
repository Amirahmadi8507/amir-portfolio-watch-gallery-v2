import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function HeroObject() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    // چرخش آرام
    meshRef.current.rotation.y += 0.003;

    // واکنش نرم به موس
    meshRef.current.rotation.x +=
      (mouseY * 0.25 - meshRef.current.rotation.x) * 0.02;

    meshRef.current.rotation.z +=
      (-mouseX * 0.15 - meshRef.current.rotation.z) * 0.02;

    // Parallax
    const targetX = mouseX * 0.35;
    const targetY = mouseY * 0.25;

    meshRef.current.position.x +=
      (targetX - meshRef.current.position.x) * 0.03;

    meshRef.current.position.y +=
      (targetY - meshRef.current.position.y) * 0.03;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.4}
      floatIntensity={0.8}
    >
      <mesh
        ref={meshRef}
        position={[0.35, 0.05, 0]}
        rotation={[0.3, 0.4, 0]}
        scale={1.15}
      >
        <icosahedronGeometry args={[1.6, 2]} />

        <meshStandardMaterial
          color="#d6b36a"
          metalness={0.9}
          roughness={0.16}
          emissive="#8a6828"
          emissiveIntensity={0.18}
        />
      </mesh>
    </Float>
  );
}

export default HeroObject;