import { useMapController } from '../../hooks/useMapController';

const AttackButton = ({ country, text }: { country: string; text: string }) => {
  const { addAggressor } = useMapController();

  return (
    <div className="my-2">
      <button
        className="btn-primary w-full"
        onClick={() => addAggressor(country)}
      >
        {text}
      </button>
    </div>
  );
};

export default AttackButton;
