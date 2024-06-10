import { createContext, ReactNode, useState } from 'react';
import {
  AggressorsType,
  ProjectileLocationData,
  MapControllerContextType,
  DefenseData,
  InterceptorCountAction,
} from '../types';
import data from '../data/defense-data.json';
import { latLonToVector3 } from '../helpers/getSplineFromCoords';
import { DEFENSE_RADIUS, GLOBE_RADIUS } from '../helpers/constants';

export const MapControllerContext = createContext<
  MapControllerContextType | undefined
>(undefined);

const initDefenseData = Object.values(data).map((defense) => ({
  ...defense,
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
  const [catastrophicEventCount, setCatastrophicEventCount] = useState(0);
  const [selectedHangar, setSelectedHangar] = useState<number | null>(null);

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
          ? { ...defense, is_active: !defense.is_active }
          : defense
      )
    );
  };

  const updateInterceptorCount = (
    id: number,
    action: InterceptorCountAction
  ) => {
    let operator;
    switch (action) {
      case InterceptorCountAction.ADD:
        operator = '+';
        break;
      case InterceptorCountAction.REMOVE:
      case InterceptorCountAction.DEFEND_THREAT:
        operator = '-';
        break;
      default:
    }

    if (!operator) return;

    setDefenses((prevDefenses) =>
      prevDefenses.map((defense) => {
        const count = eval(defense.count + operator + 1);
        return defense.id === id
          ? {
              ...defense,
              is_active: count > 0,
              count,
              threats_neutralized:
                action === InterceptorCountAction.DEFEND_THREAT
                  ? defense.threats_neutralized + 1
                  : defense.threats_neutralized,
            }
          : defense;
      })
    );
  };

  const addThreatsMissed = (id: number) => {
    setDefenses((prevDefenses) =>
      prevDefenses.map((defense) => {
        return defense.id === id
          ? {
              ...defense,
              threats_missed: defense.threats_missed + 1,
            }
          : defense;
      })
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
        updateInterceptorCount,
        addThreatsMissed,
        catastrophicEventCount,
        setCatastrophicEventCount,
        selectedHangar,
        setSelectedHangar,
      }}
    >
      {children}
    </MapControllerContext.Provider>
  );
};
