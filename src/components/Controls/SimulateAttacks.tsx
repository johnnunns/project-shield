import Accordion from '../../commonComponents/Accordion';
import AttackButton from './AttackButton';

const SimulateAttacks = () => {
  return (
    <>
      <Accordion title="Simulate Attacks">
        <AttackButton country="rus" text="Simulate Attack from Russia" />
        <AttackButton country="chn" text="Simulate Attack from China" />
        <AttackButton country="nke" text="Simulate Attack from N. Korea" />
      </Accordion>
    </>
  );
};

export default SimulateAttacks;
