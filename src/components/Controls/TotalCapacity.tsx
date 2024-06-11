import { useMapController } from '../../hooks/useMapController';
import { InterceptorCountAction, TotalCapacityProps } from '../../types';

const TotalCapacity = ({ hangarDetails }: TotalCapacityProps) => {
  const { updateInterceptorCount, setHangarsRequestingReinforcements } =
    useMapController();
  const capacityRatio = Math.floor(
    (hangarDetails.count / hangarDetails.capacity) * 100
  );

  const bgColor = hangarDetails.count
    ? hangarDetails.count > 5
      ? 'bg-retroGreen'
      : 'bg-orange-400'
    : 'bg-red-500';

  return (
    <div className="mt-20">
      <div className="mb-3 text-xl">Total Interceptors/Capacity</div>
      <div className="relative w-[95%] px-2">
        <div className={`${bgColor} w-full h-2.5 absolute opacity-50`} />
        <div
          className={`${bgColor} ${capacityRatio} h-2.5 absolute`}
          style={{ width: `${capacityRatio}%` }}
        />
        <div className="pt-6">
          {hangarDetails.count}/{hangarDetails.capacity}
        </div>
        <div className="mt-3">
          <button
            className="btn-primary"
            onClick={() => {
              setHangarsRequestingReinforcements((prevHangars) => {
                if (!prevHangars.includes(hangarDetails.id)) {
                  return [...prevHangars, hangarDetails.id];
                }
                return prevHangars;
              });

              // remove reinforcements from hangar depot in california
              updateInterceptorCount(
                'ca',
                InterceptorCountAction.REMOVE,
                hangarDetails.capacity - hangarDetails.count
              );
            }}
            disabled={
              capacityRatio === 100 || hangarDetails.name === 'California'
            }
          >
            Send Reinforcements
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalCapacity;
