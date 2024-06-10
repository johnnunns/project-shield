import { useMapController } from '../../hooks/useMapController';
import Defense from './Defense';

const Defenses = () => {
  const { defenses } = useMapController();

  return (
    <>
      {defenses.map((defense) => {
        return <Defense key={defense.id} defense={defense} />;
      })}
    </>
  );
};

export default Defenses;
