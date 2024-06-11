import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMapController } from '../../hooks/useMapController';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import TotalCapacity from './TotalCapacity';
import NeutralizedMissed from './NeutralizedMissed';

const HangarDetails = () => {
  const { selectedHangar, updateSelectedHangar, defenses } = useMapController();

  const hangarDetails = defenses.find(
    (defense) => defense.id === selectedHangar
  );

  if (!hangarDetails) {
    updateSelectedHangar('');
    return;
  }

  return (
    <div className="p-3 h-full">
      <div className="text-left">
        <button
          className="btn-primary"
          onClick={() => updateSelectedHangar('')}
        >
          <FontAwesomeIcon className="mr-2" icon={faArrowLeft} size="xs" />
          Back
        </button>
      </div>
      <div className="text-3xl my-8">{hangarDetails.name}</div>
      <div className="text-left">
        <div className="text-xl">General</div>
        <div className="p-2">
          <div>Latitude - {hangarDetails.lat}</div>
          <div>Longitude - {hangarDetails.lon}</div>
        </div>
        <div className="flex justify-around flex-col">
          <TotalCapacity hangarDetails={hangarDetails} />
          {(hangarDetails.threats_missed !== 0 ||
            hangarDetails.threats_neutralized !== 0) && (
            <NeutralizedMissed
              missed={hangarDetails.threats_missed}
              neutralized={hangarDetails.threats_neutralized}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HangarDetails;
