import Accordion from '../../commonComponents/Accordion';
import { useMapController } from '../../hooks/useMapController';

const Stats = () => {
  const { projectiles, defenses, catastrophicEventCount } = useMapController();

  const defenseCounts = defenses.reduce(
    (acc, item) => {
      acc.inventory = acc.inventory + item.count;
      acc.neutralized = acc.neutralized + item.threats_neutralized;

      return acc;
    },
    {
      inventory: 0,
      neutralized: 0,
    }
  );

  return (
    <Accordion title="Statistics">
      <div className="text-left mt-2 gap-2 flex flex-col p-1">
        <p>
          <b>Active Threats:</b> {projectiles.length}
        </p>
        <p>
          <b>Threats Neutralized:</b> {defenseCounts.neutralized}
        </p>
        <p>
          <b>Catastrophic Events:</b> {catastrophicEventCount}
        </p>
        <p>
          <b>Total Interceptors Available:</b> {defenseCounts.inventory}
        </p>
      </div>
    </Accordion>
  );
};

export default Stats;
