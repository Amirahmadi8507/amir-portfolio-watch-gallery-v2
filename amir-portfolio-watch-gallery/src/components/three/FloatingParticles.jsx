import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function FloatingParticles() {
  const pointsRef = useRef();

  const positions = [
    0, 0, 0,
    2, 1, -2,
    -2, 1, -1,
    1, -2, -2,
    -1, 2, 1,
    3, 0, -3,
    -3, -1, 2,
    0, 3, -2,

    2, -2, 1,
    -2, 2, -2,
    3, 2, 0,
    -3, 1, -1,

    1, 1, -4,
    -1, -1, -3,
    4, 1, -2,
    -4, 0, -1,

    2, 3, -4,
    -2, -3, -3,
    4, -2, -4,
    -4, 2, -3,

    1, -3, -1,
    -1, 3, -2,
    3, -1, 2,
    -3, 2, 1,

    0, -2, -4,
    0, 2, -4,
    2, 0, -5,
    -2, 0, -5,
  ];

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;

    pointsRef.current.rotation.y = time * 0.015;

    pointsRef.current.rotation.x =
      Math.sin(time * 0.2) * 0.03;

    pointsRef.current.position.y =
      Math.sin(time * 0.3) * 0.05;
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled
    >
      <PointMaterial
        transparent
        color="#d6b36a"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default FloatingParticles;