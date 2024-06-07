import * as THREE from 'three';
import { geoInterpolate } from 'd3-geo';
import { clamp } from 'lodash-es';
import {
  GLOBE_RADIUS,
  DEGREE_TO_RADIAN,
  CURVE_MAX_ALTITUDE,
  CURVE_MIN_ALTITUDE,
} from './constants';

export const latLonToVector3 = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * DEGREE_TO_RADIAN;
  const theta = (lng + 180) * DEGREE_TO_RADIAN;

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

export const getSplineFromCoords = (coords: {
  dest_lat: number;
  dest_lon: number;
  src_lat: number;
  src_lon: number;
}) => {
  const startLat = coords.src_lat;
  const startLng = coords.src_lon;
  const endLat = coords.dest_lat;
  const endLng = coords.dest_lon;

  // start and end points
  const start = latLonToVector3(startLat, startLng, GLOBE_RADIUS);
  const end = latLonToVector3(endLat, endLng, GLOBE_RADIUS);

  // altitude
  const altitude = clamp(
    start.distanceTo(end) * 0.1,
    CURVE_MIN_ALTITUDE,
    CURVE_MAX_ALTITUDE
  );

  // 2 control points
  const interpolate = geoInterpolate([startLng, startLat], [endLng, endLat]);
  const midCoord1 = interpolate(0.25);
  const midCoord2 = interpolate(0.75);
  const mid1 = latLonToVector3(
    midCoord1[1],
    midCoord1[0],
    GLOBE_RADIUS + altitude
  );
  const mid2 = latLonToVector3(
    midCoord2[1],
    midCoord2[0],
    GLOBE_RADIUS + altitude
  );

  return {
    start,
    end,
    spline: new THREE.CubicBezierCurve3(start, mid1, mid2, end),
  };
};
