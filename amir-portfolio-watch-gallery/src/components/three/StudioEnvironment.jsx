import { Environment, Lightformer } from "@react-three/drei";

/*
  محیط استودیویی ساخته‌شده با Lightformer
  برخلاف preset های drei هیچ فایل HDR از اینترنت دانلود نمی‌کند،
  پس حتی آفلاین و روی GitHub Pages بدون مشکل کار می‌کند.
*/

function StudioEnvironment({ warm = "#ffd9b8", cool = "#bfe9ff" }) {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#0c0b0a"]} />

      <Lightformer
        form="rect"
        intensity={3.2}
        color="#ffffff"
        position={[0, 5, 2]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[10, 4, 1]}
      />

      <Lightformer
        form="rect"
        intensity={2.4}
        color={warm}
        position={[-5, 1, 2]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[6, 3, 1]}
      />

      <Lightformer
        form="rect"
        intensity={2}
        color={cool}
        position={[5, 0, -2]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[6, 3, 1]}
      />

      <Lightformer
        form="ring"
        intensity={2.2}
        color="#ffffff"
        position={[0, 1, -6]}
        scale={5}
      />
    </Environment>
  );
}

export default StudioEnvironment;
