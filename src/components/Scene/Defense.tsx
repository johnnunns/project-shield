import { DEFENSE_RADIUS } from '../../helpers/constants';
import { useMapController } from '../../hooks/useMapController';
import { DefenseProps } from '../../types';

const Defense = ({ defense }: DefenseProps) => {
  const { setSelectedHangar } = useMapController();
  const { is_active, count, position } = defense;

  const color = is_active ? (count > 5 ? '#7FFF7F' : 'orange') : 'red';
  const el = document.querySelector('#world-container') as HTMLElement;

  return (
    <mesh
      position={position}
      onPointerEnter={() => {
        el.style.cursor = 'pointer';
      }}
      onPointerLeave={() => {
        el.style.cursor = 'default';
      }}
      onClick={() => setSelectedHangar(defense.id)}
    >
      <sphereGeometry args={[DEFENSE_RADIUS, 32, 32]} />
      <meshStandardMaterial color={color} opacity={0.5} transparent />
    </mesh>
  );
};

export default Defense;
