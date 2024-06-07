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
}

export interface LatLongs {
  lat: number;
  lon: number;
}

export interface DefenseData {
  id: number;
  position: THREE.Vector3;
  isActive: boolean;
  name: string;
  count: number;
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
