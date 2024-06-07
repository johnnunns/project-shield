import { useMapController } from '../../hooks/useMapController';

const AttackButton = ({ country, text }: { country: string; text: string }) => {
  const { addAggressor } = useMapController();

  return (
    <div className="my-2">
      <button
        className="hover:bg-gray-700 py-2 px-4 w-full border rounded"
        onClick={() => addAggressor(country)}
      >
        {text}
      </button>
    </div>
  );
};

export default AttackButton;
