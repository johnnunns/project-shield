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
      <div className="text-left mt-2">
        <p>
          <b>Total Interceptors:</b> {defenseCounts.inventory}
        </p>
        <p>
          <b>Current Threats:</b> {projectiles.length}
        </p>
        <p>
          <b>Threats Neutralized:</b> {defenseCounts.neutralized}
        </p>
        <p>
          <b>Catastrophic Events:</b> {catastrophicEventCount}
        </p>
      </div>
    </Accordion>
  );
};

export default Stats;
