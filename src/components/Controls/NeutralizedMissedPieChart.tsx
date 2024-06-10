import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const NeutralizedMissedPieChart = ({
  missed,
  neutralized,
}: {
  missed: number;
  neutralized: number;
}) => {
  const data = [
    { name: 'Neutralized', value: neutralized },
    { name: 'Missed', value: missed },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={100} height={100}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default NeutralizedMissedPieChart;
