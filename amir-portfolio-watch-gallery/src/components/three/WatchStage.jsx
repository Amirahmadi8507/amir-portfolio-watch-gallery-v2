import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
} from "@react-three/drei";

import DetailedWatch from "./DetailedWatch";
import StudioEnvironment from "./StudioEnvironment";
import { getWatchStyle } from "./watchStyles";
import { useInView } from "../../hooks/useInView";

/*
  یک «استیج» کامل برای نمایش ساعت سه‌بعدی:
  - controls: کاربر با موس/لمس ساعت را می‌چرخاند
  - بدون controls: ساعت آرام شناور است و به موس واکنش نشان می‌دهد
  - Canvas فقط وقتی در دید است ساخته می‌شود (صرفه‌جویی GPU)
*/

function PointerTilt({ children, strength = 0.35 }) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;

    const targetY = state.pointer.x * strength;
    const targetX = -state.pointer.y * strength * 0.7;

    group.current.rotation.y +=
      (targetY - group.current.rotation.y) * 0.06;
    group.current.rotation.x +=
      (targetX - group.current.rotation.x) * 0.06;
  });

  return <group ref={group}>{children}</group>;
}

function StageContent({
  category,
  controls,
  explodeRef,
  autoRotate,
  float,
  sparkles,
  shadow,
  scale,
}) {
  const style = getWatchStyle(category);

  const watch = (
    <DetailedWatch
      category={category}
      explodeRef={explodeRef}
      scale={scale}
    />
  );

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <pointLight
        position={[-4, 1, 3]}
        intensity={22}
        distance={12}
        color={style.accent}
      />
      <pointLight position={[0, 2, -4]} intensity={30} distance={10} />

      <StudioEnvironment />

      {controls ? (
        <group rotation={[0.1, -0.35, 0]}>{watch}</group>
      ) : (
        <PointerTilt>
          {float ? (
            <Float
              speed={1.4}
              rotationIntensity={0.25}
              floatIntensity={0.7}
            >
              <group rotation={[0.18, -0.4, 0.05]}>{watch}</group>
            </Float>
          ) : (
            <group rotation={[0.1, -0.35, 0]}>{watch}</group>
          )}
        </PointerTilt>
      )}

      {sparkles && (
        <Sparkles
          count={45}
          scale={[7, 5, 4]}
          size={2.2}
          speed={0.35}
          opacity={0.7}
          color={style.accent}
        />
      )}

      {shadow && (
        <ContactShadows
          position={[0, -2.6, 0]}
          opacity={0.45}
          scale={9}
          blur={2.6}
          far={4}
          resolution={256}
        />
      )}

      {controls && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={autoRotate}
          autoRotateSpeed={1.4}
          minPolarAngle={Math.PI * 0.25}
          maxPolarAngle={Math.PI * 0.75}
        />
      )}
    </>
  );
}

function WatchStage({
  category = "luxury",
  controls = false,
  autoRotate = true,
  float = true,
  sparkles = true,
  shadow = false,
  explodeRef,
  scale = 1,
  cameraZ = 6.4,
  className = "",
}) {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`watch-stage ${className}`}>
      {inView && (
        <Canvas
          dpr={[1, 1.6]}
          gl={{ antialias: true, alpha: true }}
          style={{ touchAction: controls ? "pan-y" : "auto" }}
        >
          <Suspense fallback={null}>
            <PerspectiveCamera
              makeDefault
              position={[0, 0, cameraZ]}
              fov={38}
              near={0.1}
              far={100}
            />

            <StageContent
              category={category}
              controls={controls}
              explodeRef={explodeRef}
              autoRotate={autoRotate}
              float={float}
              sparkles={sparkles}
              shadow={shadow}
              scale={scale}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}

export default WatchStage;
