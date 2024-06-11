import { Vector3 } from '@react-three/fiber';
import { ReactNode } from 'react';
import { Dispatch, SetStateAction } from 'react';
import * as THREE from 'three';

export interface MapControllerContextType {
  cameraPosition: Vector3;
  targetPosition: Vector3;
  autoRotating: boolean;
  setAutoRotating: Dispatch<SetStateAction<boolean>>;
  addAggressor: (aggressor: string) => void;
  removeAggressor: (aggressor: string) => void;
  aggressors: AggressorsType;
  projectiles: ProjectileLocationData[];
  addProjectile: (projectile: ProjectileLocationData) => void;
  removeProjectile: (id: number | string) => void;
  defenses: DefenseData[];
  toggleDefenseActive: (id: string) => void;
  updateInterceptorCount: (
    id: string,
    action: InterceptorCountAction,
    removeCount?: number
  ) => void;
  addThreatsMissed: (id: string, coordsId: string | number) => void;
  catastrophicEventCount: number;
  setCatastrophicEventCount: Dispatch<SetStateAction<number>>;
  selectedHangar: string;
  updateSelectedHangar: (id: string, lat?: number, lon?: number) => void;
  setHangarsRequestingReinforcements: Dispatch<SetStateAction<string[]>>;
  hangarsRequestingReinforcements: HangarRequestType;
  removeHangarRequest: (id: string) => void;
}

export enum InterceptorCountAction {
  REINFORCE,
  REMOVE,
  DEFEND_THREAT,
}

export interface LatLongs {
  lat: number;
  lon: number;
}

export interface DefenseData {
  id: string;
  position: THREE.Vector3;
  is_active: boolean;
  name: string;
  count: number;
  threats_neutralized: number;
  threats_missed: number;
  lat: number;
  lon: number;
  capacity: number;
}

export interface DefenseProps {
  defense: DefenseData;
}

export interface ProjectileProps {
  projectileData: ProjectileLocationData;
  startTime: number;
  type: string;
}

export interface TotalCapacityProps {
  hangarDetails: DefenseData;
}

export interface ProjectileLocationData {
  id: string | number;
  dest_lat: number;
  dest_lon: number;
  src_lat: number;
  src_lon: number;
  src_cty: string;
  start_time?: number;
  tracked?: boolean;
  type?: string;
}

export interface HangarData {
  [key: string]: DefenseData;
}

export interface AggressorCountryData {
  [key: string]: ProjectileLocationData[];
}

export type AggressorsType = string[];

export type HangarRequestType = string[];

export interface InterceptorDepotData {
  id: string;
  lat: number;
  lon: number;
  is_active: boolean;
  count: number;
}

export interface InterceptorDepotDataMap {
  [key: string]: InterceptorDepotData;
}

export interface AccordionProps {
  title: string;
  expanded?: boolean;
  children: ReactNode;
}
