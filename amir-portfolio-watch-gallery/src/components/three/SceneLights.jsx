import { Environment } from "@react-three/drei";

function SceneLights() {
  return (
    <>
      {/* نور اصلی */}
      <ambientLight intensity={0.35} />

      {/* نور بالایی و اصلی */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.5}
      />

      {/* نور گرم از سمت راست */}
      <pointLight
        position={[4, 2, 4]}
        intensity={35}
        distance={12}
        decay={2}
      />

      {/* نور از سمت چپ */}
      <pointLight
        position={[-4, 1, 3]}
        intensity={25}
        distance={10}
        decay={2}
      />

      {/* نور پشت آبجکت برای Rim Light */}
      <pointLight
        position={[0, 2, -4]}
        intensity={40}
        distance={10}
        decay={2}
      />

      {/* نور پایین برای ایجاد عمق */}
      <pointLight
        position={[0, -4, 2]}
        intensity={12}
        distance={8}
        decay={2}
      />

      {/* محیط استودیویی */}
      <Environment preset="studio" />
    </>
  );
}

export default SceneLights;