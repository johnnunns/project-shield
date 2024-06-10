import { useEffect, useRef } from 'react';
import { useFrame, ReactThreeFiber } from '@react-three/fiber';
import * as THREE from 'three';
import { getSplineFromCoords } from '../../helpers/getSplineFromCoords';
import { InterceptorCountAction, ProjectileProps } from '../../types';
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
  const {
    removeProjectile,
    removeAggressor,
    defenses,
    updateInterceptorCount,
    setCatastrophicEventCount,
    addThreatsMissed,
  } = useMapController();

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
      const t = (elapsedTime * 0.1) % 1;

      const drawCount = Math.floor(t * maxRange);
      geometry.setDrawRange(0, drawCount);

      const point = spline.getPointAt(t);
      meshRef.current.position.set(point.x, point.y, point.z);
      const destructionEvent =
        Math.abs(end.x - point.x) < 0.01 &&
        Math.abs(end.y - point.y) < 0.01 &&
        Math.abs(end.z - point.z) < 0.01;

      if (destructionEvent) {
        removeAggressor(coords.src_cty);
        removeProjectile(coords.id);
        setCatastrophicEventCount((prevCount) => prevCount + 1);
      }

      defenses.forEach((defense) => {
        const distance = point.distanceTo(defense.position);
        const radiusInWorldUnits = DEFENSE_RADIUS;
        if (distance < radiusInWorldUnits) {
          if (defense.is_active) {
            removeAggressor(coords.src_cty);
            removeProjectile(coords.id);
            updateInterceptorCount(
              defense.id,
              InterceptorCountAction.DEFEND_THREAT
            );
          } else if (!coords.tracked) {
            addThreatsMissed(defense.id, coords.id);
            coords.tracked = true;
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
