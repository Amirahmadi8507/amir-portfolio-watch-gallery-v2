import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import {
  Float,
  PerspectiveCamera,
  Sparkles,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import DetailedWatch from "./DetailedWatch";
import StudioEnvironment from "./StudioEnvironment";
import FloatingParticles from "./FloatingParticles";
import { useInView } from "../../hooks/useInView";

/* حلقه‌های طلایی که دور ساعت می‌چرخند */

function OrbitRings() {
  const outer = useRef();
  const inner = useRef();

  useFrame((state, delta) => {
    if (outer.current) {
      outer.current.rotation.z += delta * 0.12;
      outer.current.rotation.x = 1.15 + Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }
    if (inner.current) {
      inner.current.rotation.z -= delta * 0.2;
      inner.current.rotation.y = 0.9 + Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <>
      <mesh ref={outer} rotation={[1.15, 0, 0]}>
        <torusGeometry args={[2.9, 0.012, 12, 160]} />
        <meshStandardMaterial
          color="#dc9468"
          emissive="#dc9468"
          emissiveIntensity={1.2}
          metalness={1}
          roughness={0.2}
        />
      </mesh>

      <mesh ref={inner} rotation={[0.4, 0.9, 0]}>
        <torusGeometry args={[2.35, 0.008, 12, 140]} />
        <meshStandardMaterial
          color="#3cb4be"
          emissive="#3cb4be"
          emissiveIntensity={1}
          metalness={1}
          roughness={0.2}
        />
      </mesh>
    </>
  );
}

function SceneContent() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    const targetY = state.pointer.x * 0.45;
    const targetX = -state.pointer.y * 0.3;

    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <pointLight position={[4, 2, 4]} intensity={30} distance={12} color="#dc9468" />
      <pointLight position={[-4, 1, 3]} intensity={20} distance={10} color="#3cb4be" />
      <pointLight position={[0, 2, -4]} intensity={35} distance={10} />

      <StudioEnvironment />

      <group ref={groupRef}>
        <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.8}>
          <group rotation={[0.2, -0.45, 0.06]} scale={1.15}>
            <DetailedWatch category="luxury" />
          </group>
        </Float>

        <OrbitRings />
      </group>

      <Sparkles
        count={70}
        scale={[9, 6, 5]}
        size={2.4}
        speed={0.4}
        opacity={0.75}
        color="#dc9468"
      />

      <group position={[0, 0, -1]}>
        <FloatingParticles />
      </group>
    </>
  );
}

function ThreeScene() {
  const [ref, inView] = useInView();

  return (
    <div className="three-scene" ref={ref}>
      {inView && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <PerspectiveCamera
              makeDefault
              position={[0, 0, 8]}
              fov={40}
              near={0.1}
              far={100}
            />

            <SceneContent />

            <EffectComposer>
              <Bloom
                intensity={0.7}
                luminanceThreshold={0.8}
                luminanceSmoothing={0.5}
                mipmapBlur
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}

export default ThreeScene;
