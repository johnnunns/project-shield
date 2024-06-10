import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Accordion from '../../commonComponents/Accordion';
import { useMapController } from '../../hooks/useMapController';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const ManageDefenses = () => {
  const { defenses, setSelectedHangar } = useMapController();

  return (
    <Accordion title="Manage Defenses">
      {defenses.map((d) => {
        return (
          <div key={d.id} className="flex mt-2 align-center">
            <div
              className={`w-full hover:bg-gray-600 text-left py-2 px-1 ${
                d.is_active
                  ? d.count > 5
                    ? 'text-retroGreen'
                    : 'text-orange-400'
                  : 'text-red-500'
              }`}
              role="button"
              onClick={() => setSelectedHangar(d.id)}
            >
              {d.name}
              {d.count < 5 && (
                <FontAwesomeIcon
                  className="ml-1.5"
                  icon={faCircleExclamation}
                  color="inherit"
                />
              )}
            </div>
          </div>
        );
      })}
    </Accordion>
  );
};

export default ManageDefenses;
