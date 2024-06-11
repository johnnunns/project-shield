import { useMapController } from '../../hooks/useMapController';
import HangarDetails from './HangarDetails';
import ManageDefenses from './ManageDefenses';
import SimulateAttacks from './SimulateAttacks';
import Stats from './Stats';

const Controllers = () => {
  const { selectedHangar } = useMapController();

  return (
    <div className="min-w-80 text-center flex flex-col">
      {selectedHangar ? (
        <HangarDetails />
      ) : (
        <>
          <SimulateAttacks />
          <ManageDefenses />
          <Stats />
        </>
      )}
    </div>
  );
};

export default Controllers;
