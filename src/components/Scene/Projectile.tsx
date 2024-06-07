import { useEffect, useRef } from 'react';
import { useFrame, ReactThreeFiber } from '@react-three/fiber';
import * as THREE from 'three';
import { getSplineFromCoords } from '../../helpers/getSplineFromCoords';
import { ProjectileProps } from '../../types';
import { CURVE_SEGMENTS, DEFENSE_RADIUS } from '../../helpers/constants';
import { useMapController } from '../../hooks/useMapController';

const t = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  line: 'line' as any as (
    _: ReactThreeFiber.Object3DNode<THREE.Line, typeof THREE.Line>
  ) => JSX.Element,
};

const Projectile = ({ coords, startTime }: ProjectileProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<THREE.Line>(null);
  const { removeProjectile, removeAggressor, defenses } = useMapController();

  const { spline, end } = getSplineFromCoords(coords);
  const points = spline.getPoints(100);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  geometry.setDrawRange(0, 0);
  const maxRange = CURVE_SEGMENTS * 3;

  useEffect(() => {
    // Ensure the geometry and material are set correctly
    if (lineRef.current) {
      lineRef.current.geometry = geometry;
    }
  }, [geometry]);

  useFrame(({ clock }) => {
    if (meshRef.current && lineRef.current) {
      const elapsedTime = clock.getElapsedTime() - startTime;
      const t = (elapsedTime * 0.025) % 1;

      const drawCount = Math.floor(t * maxRange);
      geometry.setDrawRange(0, drawCount);

      const point = spline.getPointAt(t);
      meshRef.current.position.set(point.x, point.y, point.z);
      const removalCondition =
        Math.abs(end.x - point.x) < 0.005 &&
        Math.abs(end.y - point.y) < 0.005 &&
        Math.abs(end.z - point.z) < 0.005;

      if (removalCondition) {
        removeAggressor(coords.src_cty);
        removeProjectile(coords.id);
      }

      defenses.forEach((defense) => {
        if (defense.isActive) {
          const distance = point.distanceTo(defense.position);
          const radiusInWorldUnits = DEFENSE_RADIUS;
          if (distance < radiusInWorldUnits) {
            removeAggressor(coords.src_cty);
            removeProjectile(coords.id);
          }
        }
      });
    }
  });

  return (
    <>
      <t.line ref={lineRef}>
        <bufferGeometry attach="geometry" {...geometry} />
        <lineBasicMaterial attach="material" color="red" />
      </t.line>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
};

export default Projectile;
