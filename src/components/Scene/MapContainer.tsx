import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Map from './Map';
import Projectiles from './Projectiles';
import Defenses from './Defenses';
import { DEFAULT_ZOOM } from '../../helpers/constants';
import SmoothCamera from './SmoothCamera';

const MapContainer = () => {
  return (
    <div
      id="world-container"
      className="flex-1 border-r-2 border-white relative"
    >
      <Canvas>
        <SmoothCamera />
        <ambientLight intensity={1} />
        <OrbitControls minDistance={3} maxDistance={DEFAULT_ZOOM} />
        <Map />
        <Projectiles />
        <Defenses />
      </Canvas>
    </div>
  );
};

export default MapContainer;
