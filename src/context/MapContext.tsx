import { createContext, ReactNode, useState } from 'react';
import {
  AggressorsType,
  ProjectileLocationData,
  MapControllerContextType,
  DefenseData,
} from '../types';
import data from '../data/defense-coordinates.json';
import { latLonToVector3 } from '../helpers/getSplineFromCoords';
import { DEFENSE_RADIUS, GLOBE_RADIUS } from '../helpers/constants';

export const MapControllerContext = createContext<
  MapControllerContextType | undefined
>(undefined);

const initDefenseData = Object.values(data).map((defense) => ({
  ...defense,
  isActive: defense.is_active,
  position: latLonToVector3(
    defense.lat,
    defense.lon,
    GLOBE_RADIUS - DEFENSE_RADIUS / 2
  ),
}));

export const MapControllerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [aggressors, setAggressors] = useState<AggressorsType>([]);
  const [projectiles, setProjectiles] = useState<ProjectileLocationData[]>([]);
  const [defenses, setDefenses] = useState<DefenseData[]>(initDefenseData);

  const addProjectile = (projectile: ProjectileLocationData) => {
    setProjectiles((prev) => [...prev, projectile]);
  };

  const removeProjectile = (id: number) => {
    setProjectiles((prev) => prev.filter((p) => p.id !== id));
  };

  const addAggressor = (country: string) => {
    if (!aggressors.includes(country)) {
      setAggressors(
        (prevAggressors: AggressorsType): AggressorsType => [
          ...prevAggressors,
          country,
        ]
      );
    }
  };

  const removeAggressor = (country: string) => {
    setAggressors(aggressors.filter((agg) => agg !== country));
  };

  const toggleDefenseActive = (id: number) => {
    setDefenses((prevDefenses) =>
      prevDefenses.map((defense) =>
        defense.id === id
          ? { ...defense, isActive: !defense.isActive }
          : defense
      )
    );
  };

  return (
    <MapControllerContext.Provider
      value={{
        aggressors,
        addAggressor,
        removeAggressor,
        projectiles,
        addProjectile,
        removeProjectile,
        defenses,
        toggleDefenseActive,
      }}
    >
      {children}
    </MapControllerContext.Provider>
  );
};
