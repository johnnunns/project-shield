import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Map from './Map';
import Projectiles from './Projectiles';
import Defenses from './Defenses';

const MapContainer = () => {
  return (
    <div
      id="world-container"
      className="flex-1 border-r-2 border-white relative"
    >
      <Canvas>
        <PerspectiveCamera
          makeDefault
          fov={60}
          zoom={3.5}
          position={[-25, 20, 25]}
        />
        <ambientLight intensity={1} />
        <OrbitControls minDistance={1} maxDistance={13} />
        <Map />
        <Projectiles />
        <Defenses />
      </Canvas>
    </div>
  );
};

export default MapContainer;
