import { DEFENSE_RADIUS } from '../../helpers/constants';
import { DefenseData } from '../../types';

const Defense = ({ position, isActive }: DefenseData) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[DEFENSE_RADIUS, 32, 32]} />
      <meshStandardMaterial
        color={isActive ? '#7FFF7F' : 'red'}
        opacity={0.5}
        transparent
      />
    </mesh>
  );
};

export default Defense;
