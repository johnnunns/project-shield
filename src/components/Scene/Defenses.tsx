import { useMapController } from '../../hooks/useMapController';
import Defense from './Defense';

const Defenses = () => {
  const { defenses } = useMapController();

  return (
    <>
      {defenses.map((defense) => (
        <Defense key={defense.id} {...defense} />
      ))}
    </>
  );
};

export default Defenses;
