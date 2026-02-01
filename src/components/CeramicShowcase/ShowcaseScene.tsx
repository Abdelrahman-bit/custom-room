import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Floor } from './Floor';
import type { CeramicVariant } from './types';

interface ShowcaseSceneProps {
  design: CeramicVariant;
}

export function ShowcaseScene({ design }: ShowcaseSceneProps) {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow intensity={1} />
        <Environment preset="apartment" />
        <Floor design={design} />
      </Canvas>
    </div>
  );
}
