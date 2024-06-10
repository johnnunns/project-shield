import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMapController } from '../../hooks/useMapController';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import NeutralizedMissedChart from './NeutralizedMissedChart';

const HangarDetails = () => {
  const { selectedHangar, setSelectedHangar, defenses } = useMapController();

  const hangerDetails = defenses.find(
    (defense) => defense.id === selectedHangar
  );
  console.log(selectedHangar, defenses);
  if (!hangerDetails) {
    setSelectedHangar(null);
    return;
  }

  const capacityRatio = Math.floor(
    (hangerDetails.count / hangerDetails.capacity) * 100
  );

  return (
    <div className="p-3 h-full">
      <div className="text-left">
        <button className="btn-primary" onClick={() => setSelectedHangar(null)}>
          <FontAwesomeIcon className="mr-2" icon={faArrowLeft} size="xs" />
          Back
        </button>
      </div>
      <div className="text-3xl my-8">{hangerDetails.name}</div>
      <div className="text-left">
        <div>Latitude - {hangerDetails.lat}</div>
        <div>Longitude - {hangerDetails.lon}</div>
        <div className="flex justify-around flex-col">
          <div className="mt-20">
            <div className="mb-3">Total Interceptors/Capacity</div>
            <div className="relative w-[95%] px-2">
              <div className="bg-red-400 w-full h-2.5 absolute" />
              <div
                className={`bg-white ${capacityRatio} h-2.5 absolute`}
                style={{ width: `${capacityRatio}%` }}
              />
              <div className="pt-6">
                {hangerDetails.count}/{hangerDetails.capacity}
              </div>
              <div className="mt-3">
                <button className="btn-primary">Send Reinforcements</button>
              </div>
            </div>
          </div>
          {(hangerDetails.threats_missed !== 0 ||
            hangerDetails.threats_neutralized !== 0) && (
            <div className="h-30 mt-20">
              <div className="mb-3">Threats Neutralized/Missed</div>
              <div className="flex w-full">
                <NeutralizedMissedChart
                  missed={hangerDetails.threats_missed}
                  neutralized={hangerDetails.threats_neutralized}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HangarDetails;
