import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { usePrefersReducedMotion } from "../../hooks/useInView";

/*
  پس‌زمینه‌ی سه‌بعدی ثابت برای کل سایت:
  میدانی از ذرات که با اسکرول عمیق‌تر می‌شود و با موس پارالاکس می‌گیرد.
*/

function Field({ count = 900 }) {
  const points = useRef();
  const scrollRef = useRef(0);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const warm = new THREE.Color("#dc9468");
    const cool = new THREE.Color("#3cb4be");
    const white = new THREE.Color("#eeeae3");

    for (let i = 0; i < count; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = -Math.random() * 40;

      const pick = Math.random();
      const c = pick < 0.55 ? white : pick < 0.8 ? warm : cool;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;

    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const target = window.scrollY / max;

    scrollRef.current += (target - scrollRef.current) * Math.min(1, delta * 3);

    // با اسکرول، دوربین در عمق ذرات جلو می‌رود
    state.camera.position.z = 6 - scrollRef.current * 22;
    state.camera.position.x +=
      (state.pointer.x * 0.8 - state.camera.position.x) * 0.04;
    state.camera.position.y +=
      (state.pointer.y * 0.5 - state.camera.position.y) * 0.04;

    points.current.rotation.z = scrollRef.current * 0.6 + state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.055}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

function SiteBackground3D() {
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <div className="site-bg-3d" aria-hidden="true">
      <Canvas
        dpr={1}
        camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <Field />
      </Canvas>
    </div>
  );
}

export default SiteBackground3D;
