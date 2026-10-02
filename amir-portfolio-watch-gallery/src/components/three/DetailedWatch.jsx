import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { getWatchStyle } from "./watchStyles";

/*
  ساعت سه‌بعدی پروسیجرال (بدون نیاز به فایل مدل)
  - جهت صفحه: رو به محور +Z
  - عقربه‌ها زمان واقعی را نشان می‌دهند
  - explodeRef.current (۰ تا ۱) قطعات را از هم جدا می‌کند (نمای انفجاری)
*/

const TAU = Math.PI * 2;
const tmp = new THREE.Object3D();

/* ---------- ایندکس‌ها و خط‌های دقیقه ---------- */

function DialMarks({ style }) {
  const hourRef = useRef();
  const minuteRef = useRef();

  useLayoutEffect(() => {
    const hours = hourRef.current;
    const minutes = minuteRef.current;
    if (!hours || !minutes) return;

    for (let i = 0; i < 12; i += 1) {
      const angle = (i / 12) * TAU;
      const big = i % 3 === 0;
      const radius = 0.74;

      tmp.position.set(
        Math.sin(angle) * radius,
        Math.cos(angle) * radius,
        0
      );
      tmp.rotation.set(0, 0, -angle);
      tmp.scale.set(big ? 1.9 : 1, big ? 1.5 : 1, 1);
      tmp.updateMatrix();
      hours.setMatrixAt(i, tmp.matrix);
    }
    hours.instanceMatrix.needsUpdate = true;

    for (let i = 0; i < 60; i += 1) {
      const angle = (i / 60) * TAU;
      const radius = 0.86;

      tmp.position.set(
        Math.sin(angle) * radius,
        Math.cos(angle) * radius,
        0
      );
      tmp.rotation.set(0, 0, -angle);
      tmp.scale.set(1, 1, 1);
      tmp.updateMatrix();
      minutes.setMatrixAt(i, tmp.matrix);
    }
    minutes.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <>
      <instancedMesh ref={hourRef} args={[null, null, 12]}>
        <boxGeometry args={[0.045, 0.15, 0.025]} />
        <meshStandardMaterial
          color={style.index}
          emissive={style.index}
          emissiveIntensity={0.35}
          metalness={0.8}
          roughness={0.25}
        />
      </instancedMesh>

      <instancedMesh ref={minuteRef} args={[null, null, 60]}>
        <boxGeometry args={[0.012, 0.045, 0.012]} />
        <meshStandardMaterial
          color={style.index}
          metalness={0.6}
          roughness={0.4}
        />
      </instancedMesh>
    </>
  );
}

/* ---------- لبه‌ی دندانه‌دار بزل ---------- */

function BezelTeeth({ color, rough }) {
  const ref = useRef();

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;

    for (let i = 0; i < 72; i += 1) {
      const angle = (i / 72) * TAU;
      const radius = 1.13;

      tmp.position.set(
        Math.sin(angle) * radius,
        Math.cos(angle) * radius,
        0
      );
      tmp.rotation.set(0, 0, -angle);
      tmp.scale.set(1, 1, 1);
      tmp.updateMatrix();
      mesh.setMatrixAt(i, tmp.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={ref} args={[null, null, 72]}>
      <boxGeometry args={[0.04, 0.045, 0.09]} />
      <meshStandardMaterial
        color={color}
        metalness={1}
        roughness={rough}
      />
    </instancedMesh>
  );
}

/* ---------- بند ---------- */

function Strap({ style }) {
  const links = 8;
  const isMetal = style.strap === "metal";
  const isRubber = style.strap === "rubber";

  const pieces = useMemo(() => {
    const list = [];
    for (const side of [1, -1]) {
      for (let i = 0; i < links; i += 1) {
        const t = i / links;
        // بند به سمت عقب خم می‌شود
        list.push({
          key: `${side}-${i}`,
          y: side * (1.38 + i * 0.3),
          z: -Math.pow(t, 1.8) * 1.15,
          rx: side * -Math.pow(t, 1.4) * 0.65,
          taper: 1 - t * 0.18,
        });
      }
    }
    return list;
  }, []);

  return (
    <group>
      {pieces.map((p) => (
        <group
          key={p.key}
          position={[0, p.y, p.z]}
          rotation={[p.rx, 0, 0]}
        >
          <mesh scale={[p.taper, 1, 1]}>
            <boxGeometry
              args={[
                0.82,
                isMetal ? 0.27 : 0.31,
                isMetal ? 0.1 : 0.075,
              ]}
            />
            <meshStandardMaterial
              color={style.strapColor}
              metalness={isMetal ? 0.95 : isRubber ? 0.05 : 0.1}
              roughness={isMetal ? 0.28 : isRubber ? 0.7 : 0.55}
            />
          </mesh>

          {isMetal && (
            <mesh position={[0, 0, 0.052]} scale={[p.taper, 1, 1]}>
              <boxGeometry args={[0.5, 0.2, 0.012]} />
              <meshStandardMaterial
                color={style.accent}
                metalness={1}
                roughness={0.2}
              />
            </mesh>
          )}

          {!isMetal && (
            <mesh position={[0, 0, 0.04]} scale={[p.taper, 1, 1]}>
              <boxGeometry args={[0.7, 0.012, 0.006]} />
              <meshStandardMaterial
                color={style.accent}
                roughness={0.6}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

/* ---------- ساعت اصلی ---------- */

function DetailedWatch({
  category = "luxury",
  explodeRef,
  live = true,
  scale = 1,
}) {
  const style = getWatchStyle(category);

  const strapRef = useRef();
  const caseRef = useRef();
  const dialRef = useRef();
  const handsRef = useRef();
  const glassRef = useRef();
  const crownRef = useRef();

  const hourRef = useRef();
  const minuteRef = useRef();
  const secondRef = useRef();

  useFrame(() => {
    const explode = explodeRef ? explodeRef.current || 0 : 0;

    // جدا شدن قطعات روی محور Z
    if (strapRef.current) strapRef.current.position.z = -explode * 1.3;
    if (caseRef.current) caseRef.current.position.z = -explode * 0.5;
    if (dialRef.current) dialRef.current.position.z = explode * 0.35;
    if (handsRef.current) handsRef.current.position.z = explode * 0.95;
    if (glassRef.current) glassRef.current.position.z = explode * 1.55;
    if (crownRef.current) crownRef.current.position.x = explode * 0.55;

    if (!live) return;

    const now = new Date();
    const s = now.getSeconds() + now.getMilliseconds() / 1000;
    const m = now.getMinutes() + s / 60;
    const h = (now.getHours() % 12) + m / 60;

    if (secondRef.current) secondRef.current.rotation.z = -(s / 60) * TAU;
    if (minuteRef.current) minuteRef.current.rotation.z = -(m / 60) * TAU;
    if (hourRef.current) hourRef.current.rotation.z = -(h / 12) * TAU;
  });

  return (
    <group scale={scale}>
      {/* بند */}
      <group ref={strapRef}>
        <Strap style={style} />
      </group>

      {/* بدنه */}
      <group ref={caseRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.1, 1.1, 0.34, 96]} />
          <meshStandardMaterial
            color={style.caseColor}
            metalness={style.caseMetal}
            roughness={style.caseRough}
          />
        </mesh>

        {/* بزل */}
        <mesh position={[0, 0, 0.17]}>
          <torusGeometry args={[1.0, 0.07, 24, 120]} />
          <meshStandardMaterial
            color={style.bezel}
            metalness={1}
            roughness={0.18}
          />
        </mesh>

        <group position={[0, 0, 0.14]}>
          <BezelTeeth color={style.bezel} rough={0.3} />
        </group>

        {/* پایه‌ها (Lugs) */}
        {[
          [-0.46, 1.04],
          [0.46, 1.04],
          [-0.46, -1.04],
          [0.46, -1.04],
        ].map(([x, y]) => (
          <mesh key={`${x}${y}`} position={[x, y, 0]}>
            <boxGeometry args={[0.14, 0.42, 0.26]} />
            <meshStandardMaterial
              color={style.caseColor}
              metalness={style.caseMetal}
              roughness={style.caseRough}
            />
          </mesh>
        ))}

        {/* پشت ساعت */}
        <mesh position={[0, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.08, 64]} />
          <meshStandardMaterial
            color="#8b8f98"
            metalness={1}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* تاج */}
      <group ref={crownRef}>
        <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.13, 0.13, 0.22, 32]} />
          <meshStandardMaterial
            color={style.bezel}
            metalness={1}
            roughness={0.22}
          />
        </mesh>

        {[0.35, 0.28].map((y, i) => (
          <mesh
            key={i}
            position={[1.1, i === 0 ? y * 0.5 : -y * 0.5, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
            <meshStandardMaterial
              color={style.caseColor}
              metalness={1}
              roughness={0.25}
            />
          </mesh>
        ))}
      </group>

      {/* صفحه */}
      <group ref={dialRef}>
        <mesh position={[0, 0, 0.15]}>
          <circleGeometry args={[0.93, 96]} />
          <meshStandardMaterial
            color={style.dial}
            metalness={0.55}
            roughness={0.42}
          />
        </mesh>

        {/* حلقه‌ی داخلی صفحه */}
        <mesh position={[0, 0, 0.152]}>
          <ringGeometry args={[0.52, 0.525, 96]} />
          <meshBasicMaterial
            color={style.accent}
            transparent
            opacity={0.35}
          />
        </mesh>

        <group position={[0, 0, 0.165]}>
          <DialMarks style={style} />
        </group>

        {/* پنجره‌ی تاریخ */}
        <mesh position={[0.52, 0, 0.158]}>
          <boxGeometry args={[0.2, 0.13, 0.01]} />
          <meshStandardMaterial
            color="#f4f1ea"
            roughness={0.5}
          />
        </mesh>
      </group>

      {/* عقربه‌ها */}
      <group ref={handsRef} position={[0, 0, 0.2]}>
        <group ref={hourRef}>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.07, 0.44, 0.02]} />
            <meshStandardMaterial
              color={style.hourHand}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        </group>

        <group ref={minuteRef} position={[0, 0, 0.03]}>
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.05, 0.66, 0.02]} />
            <meshStandardMaterial
              color={style.minuteHand}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        </group>

        <group ref={secondRef} position={[0, 0, 0.06]}>
          <mesh position={[0, 0.22, 0]}>
            <boxGeometry args={[0.014, 0.9, 0.012]} />
            <meshStandardMaterial
              color={style.secondHand}
              emissive={style.secondHand}
              emissiveIntensity={0.4}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        </group>

        <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.05, 32]} />
          <meshStandardMaterial
            color={style.bezel}
            metalness={1}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* شیشه */}
      <group ref={glassRef}>
        <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.96, 0.96, 0.02, 96]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.12}
            roughness={0.05}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>
      </group>
    </group>
  );
}

export default DetailedWatch;
