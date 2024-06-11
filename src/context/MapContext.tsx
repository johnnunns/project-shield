import { createContext, ReactNode, useState } from 'react';
import {
  AggressorsType,
  ProjectileLocationData,
  MapControllerContextType,
  DefenseData,
  InterceptorCountAction,
  HangarRequestType,
} from '../types';
import data from '../data/defense-data.json';
import { latLonToVector3 } from '../helpers/getSplineFromCoords';
import {
  DEFAULT_ZOOM,
  DEFENSE_RADIUS,
  GLOBE_RADIUS,
} from '../helpers/constants';
import { Vector3 } from '@react-three/fiber';

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

export const DEFAULT_CAMERA_VECTOR = latLonToVector3(32, 220, DEFAULT_ZOOM);

export const MapControllerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cameraPosition] = useState<Vector3>(DEFAULT_CAMERA_VECTOR);
  const [targetPosition, setTargetPosition] = useState<Vector3>(
    DEFAULT_CAMERA_VECTOR
  );
  const [autoRotating, setAutoRotating] = useState(false);
  const [aggressors, setAggressors] = useState<AggressorsType>([]);
  const [hangarsRequestingReinforcements, setHangarsRequestingReinforcements] =
    useState<HangarRequestType>([]);
  const [projectiles, setProjectiles] = useState<ProjectileLocationData[]>([]);
  const [defenses, setDefenses] = useState<DefenseData[]>(initDefenseData);
  const [catastrophicEventCount, setCatastrophicEventCount] = useState(0);
  const [selectedHangar, setSelectedHangar] = useState<string>('');

  const addProjectile = (projectile: ProjectileLocationData) => {
    setProjectiles((prev) => [...prev, projectile]);
  };

  const removeProjectile = (id: number | string) => {
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

  const removeHangarRequest = (id: string) => {
    setHangarsRequestingReinforcements(
      hangarsRequestingReinforcements.filter((a) => a !== id)
    );
  };

  const toggleDefenseActive = (id: string) => {
    setDefenses((prevDefenses) =>
      prevDefenses.map((defense) =>
        defense.id === id
          ? { ...defense, is_active: !defense.is_active }
          : defense
      )
    );
  };

  const updateInterceptorCount = (
    id: string,
    action: InterceptorCountAction,
    removeCount?: number
  ) => {
    setDefenses((prevDefenses) =>
      prevDefenses.map((defense) => {
        let count = defense.count;
        switch (action) {
          case InterceptorCountAction.DEFEND_THREAT:
            count = defense.count - 1;
            break;
          case InterceptorCountAction.REMOVE:
            count = defense.count - (removeCount || 0);
            break;
          case InterceptorCountAction.REINFORCE:
            count = defense.capacity;
            break;
          default:
        }
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

  const addThreatsMissed = (id: string) => {
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

  const updateSelectedHangar = (id: string, lat?: number, lon?: number) => {
    setSelectedHangar(id);
    setAutoRotating(true);

    if (id && lat && lon) {
      const newPosition = latLonToVector3(lat, lon, GLOBE_RADIUS + 10);
      setTargetPosition(newPosition);
    } else {
      setTargetPosition(DEFAULT_CAMERA_VECTOR);
    }
  };

  return (
    <MapControllerContext.Provider
      value={{
        autoRotating,
        setAutoRotating,
        cameraPosition,
        targetPosition,
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
        updateSelectedHangar,
        hangarsRequestingReinforcements,
        setHangarsRequestingReinforcements,
        removeHangarRequest,
      }}
    >
      {children}
    </MapControllerContext.Provider>
  );
};
