import calculateRatio from '../../helpers/calculateRatio';

const NeutralizedMissed = ({
  neutralized,
  missed,
}: {
  neutralized: number;
  missed: number;
}) => {
  const result = calculateRatio(neutralized, missed);

  if (result) {
    const { xPercentage, yPercentage } = result;

    return (
      <div className="mt-20">
        <div className="mb-3 text-xl">Threats Neutralized/Missed</div>
        <div className="px-2">
          <div className="flex w-full">
            <div
              className={`bg-retroGreen h-2.5`}
              style={{ width: `${xPercentage}%` }}
            />
            <div
              className={`bg-red-500 h-2.5`}
              style={{ width: `${yPercentage}%` }}
            />
          </div>
          <div className="pt-3">
            <div className="text-retroGreen flex items-center">
              <div className="bg-retroGreen h-3 w-3 rounded-full mr-1.5" />
              Neutralized: {neutralized}
            </div>
            <div className="text-red-500 flex items-center">
              <div className="bg-red-500 h-3 w-3 rounded-full mr-1.5" />
              Missed: {missed}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default NeutralizedMissed;
