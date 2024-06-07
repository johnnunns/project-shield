import { useContext } from 'react';
import { MapControllerContext } from '../context/MapContext';

export const useMapController = () => {
  const context = useContext(MapControllerContext);
  if (context === undefined) {
    throw new Error(
      'useMapController must be used within a MapControllerProvider'
    );
  }
  return context;
};
