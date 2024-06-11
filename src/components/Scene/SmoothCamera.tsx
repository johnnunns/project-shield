import { useFrame } from '@react-three/fiber';
import { useMapController } from '../../hooks/useMapController';
import { PerspectiveCamera } from '@react-three/drei';
import { Vector3Like } from 'three';

const SmoothCamera = () => {
  const { cameraPosition, targetPosition, autoRotating, setAutoRotating } =
    useMapController();

  useFrame(({ camera }) => {
    if (autoRotating) {
      camera.position.lerp(targetPosition as Vector3Like, 0.15);
      camera.zoom = 3.5;
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      if (camera.position.distanceTo(targetPosition as Vector3Like) < 0.01) {
        setAutoRotating(false);
      }
    }
  });

  return (
    <PerspectiveCamera
      makeDefault
      fov={60}
      zoom={3.5}
      position={cameraPosition}
    />
  );
};

export default SmoothCamera;
