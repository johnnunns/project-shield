import { useMapController } from '../../hooks/useMapController';
import AttackButton from './AttackButton';

const Controllers = () => {
  const { projectiles, defenses, toggleDefenseActive } = useMapController();

  return (
    <div className="min-w-80 p-3 text-center flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold">Simulate Attacks</h3>
        <AttackButton country="rus" text="Simulate Attack from Russia" />
        <AttackButton country="chn" text="Simulate Attack from China" />
        <AttackButton country="nke" text="Simulate Attack from N. Korea" />
      </div>
      <div className="mt-3">
        <h3 className="text-xl font-bold">Defenses</h3>
        {defenses.map((d) => (
          <div key={d.id} className="flex mt-2 align-center">
            <input
              type="checkbox"
              checked={d.isActive}
              onChange={() => toggleDefenseActive(d.id)}
            />
            <div className="ml-2">{d.name}</div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <h3 className="text-xl font-bold">Stats</h3>
        <p>Current Threats: {projectiles.length}</p>
      </div>
    </div>
  );
};

export default Controllers;
