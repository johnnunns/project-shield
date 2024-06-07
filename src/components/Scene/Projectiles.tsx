import { useEffect } from 'react';
import data from '../../data/attack-coordinates.json';
import Projectile from './Projectile';
import { useMapController } from '../../hooks/useMapController';
import { AggressorCountryData, ProjectileLocationData } from '../../types';

const Aggressor: AggressorCountryData = data;

const Projectiles = () => {
  const { aggressors, projectiles, addProjectile } = useMapController();
  useEffect(() => {
    const attack = async () => {
      const aggressorCoords: ProjectileLocationData[] = [];

      aggressors.forEach((agg) => {
        const ProjectileLocationData = Aggressor[agg];

        if (ProjectileLocationData)
          aggressorCoords.push(...ProjectileLocationData);
      });

      aggressorCoords.forEach((coord) => {
        if (!projectiles.find((p) => p.id === coord.id)) {
          addProjectile({ ...coord, start_time: performance.now() / 1000 });
        }
      });
    };

    attack();
  }, [aggressors]);

  return (
    <>
      {projectiles.map((p, index) => {
        if (p.start_time) {
          return <Projectile key={index} coords={p} startTime={p.start_time} />;
        }
      })}
    </>
  );
};

export default Projectiles;
