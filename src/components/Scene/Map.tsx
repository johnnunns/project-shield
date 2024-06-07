import { useRef } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import Earth from '../../assets/earthmap.jpeg';
import { GLOBE_RADIUS } from '../../helpers/constants';

const Map = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture(Earth);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Map;
