import { ReactNode } from 'react';
import { Dispatch, SetStateAction } from 'react';
import * as THREE from 'three';

export interface MapControllerContextType {
  addAggressor: (aggressor: string) => void;
  removeAggressor: (aggressor: string) => void;
  aggressors: AggressorsType;
  projectiles: ProjectileLocationData[];
  addProjectile: (projectile: ProjectileLocationData) => void;
  removeProjectile: (id: number) => void;
  defenses: DefenseData[];
  toggleDefenseActive: (id: number) => void;
  updateInterceptorCount: (id: number, action: InterceptorCountAction) => void;
  addThreatsMissed: (id: number, coordsId: number) => void;
  catastrophicEventCount: number;
  setCatastrophicEventCount: Dispatch<SetStateAction<number>>;
  selectedHangar: number | null;
  setSelectedHangar: Dispatch<SetStateAction<number | null>>;
}

export enum InterceptorCountAction {
  ADD,
  REMOVE,
  DEFEND_THREAT,
}

export interface LatLongs {
  lat: number;
  lon: number;
}

export interface DefenseData {
  id: number;
  position: THREE.Vector3;
  is_active: boolean;
  name: string;
  count: number;
  threats_neutralized: number;
  threats_missed: number;
  lat: number;
  lon: number;
}

export interface DefenseProps {
  defense: DefenseData;
}

export interface ProjectileProps {
  coords: ProjectileLocationData;
  startTime: number;
}

export interface ProjectileLocationData {
  id: number;
  dest_lat: number;
  dest_lon: number;
  src_lat: number;
  src_lon: number;
  src_cty: string;
  start_time?: number;
  tracked?: boolean;
}

export interface AggressorCountryData {
  [key: string]: ProjectileLocationData[];
}

export type AggressorsType = string[];

export interface InterceptorDepotData {
  id: number;
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
