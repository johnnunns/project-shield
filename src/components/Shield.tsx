import { MapControllerProvider } from '../context/MapContext';
import Controls from './Controls/Controls';
import MapContainer from './Scene/MapContainer';

const Shield = () => {
  return (
    <MapControllerProvider>
      <div className="m-8 h-[80vh] flex border border-white">
        <MapContainer />
        <Controls />
      </div>
    </MapControllerProvider>
  );
};

export default Shield;
