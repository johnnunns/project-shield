import { useEffect } from 'react';
import Projectile from './Projectile';
import { useMapController } from '../../hooks/useMapController';
import { AggressorCountryData, ProjectileLocationData } from '../../types';
import aggressorData from '../../data/attack-coordinates.json';

const Aggressor: AggressorCountryData = aggressorData;

const Projectiles = () => {
  const {
    hangarsRequestingReinforcements,
    aggressors,
    projectiles,
    addProjectile,
    defenses,
  } = useMapController();

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
          addProjectile({
            ...coord,
            start_time: performance.now() / 1000,
            tracked: false,
            type: 'attack',
          });
        }
      });
    };

    attack();
  }, [aggressors]);

  useEffect(() => {
    const sendReinforcements = async () => {
      const hangarCoords: ProjectileLocationData[] = [];

      hangarsRequestingReinforcements.forEach((a: string) => {
        const defense = defenses.find((defense) => defense.id === a);
        if (defense) {
          hangarCoords.push({
            id: defense.id,
            dest_lat: defense.lat,
            dest_lon: defense.lon,
            src_lat: 40.997778,
            src_lon: 240.217695,
            src_cty: 'ca',
            type: 'reinforcements',
          });
        }
      });

      hangarCoords.forEach((coord) => {
        if (!projectiles.find((p) => p.id === coord.id)) {
          addProjectile({
            ...coord,
            start_time: performance.now() / 1000,
            tracked: false,
          });
        }
      });
    };

    sendReinforcements();
  }, [hangarsRequestingReinforcements]);

  return (
    <>
      {projectiles.map((p, index) => {
        if (p.start_time && p.type) {
          return (
            <Projectile
              key={index}
              projectileData={p}
              startTime={p.start_time}
              type={p.type}
            />
          );
        }
      })}
    </>
  );
};

export default Projectiles;
