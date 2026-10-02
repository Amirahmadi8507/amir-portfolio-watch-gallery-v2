import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, PerspectiveCamera } from "@react-three/drei";

import WatchModel from "./WatchModel";

function WatchScene() {
  return (
    <div className="watch-scene">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <Suspense fallback={null}>

          <PerspectiveCamera
            makeDefault
            position={[0, 0, 5.5]}
            fov={38}
            near={0.1}
            far={100}
          />

          <ambientLight intensity={0.4} />

          <directionalLight
            position={[3, 4, 5]}
            intensity={2}
          />

          <pointLight
            position={[3, 1, 3]}
            intensity={25}
            distance={10}
            decay={2}
          />

          <pointLight
            position={[-3, 1, 2]}
            intensity={18}
            distance={8}
            decay={2}
          />

          <Environment preset="studio" />

          <WatchModel />

        </Suspense>
      </Canvas>
    </div>
  );
}

export default WatchScene;