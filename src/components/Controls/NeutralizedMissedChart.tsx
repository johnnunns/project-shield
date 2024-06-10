import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div>
//         {payload.map((p) => (
//           <div>
//             {p.name}
//             :&nbsp;
//             {p.value}
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return null;
// };

const NeutralizedMissedChart = ({ neutralized, missed }) => {
  const renderPlainLegendText = (value, entry, index) => {
    return (
      <span style={{ marginTop: '2px' }}>
        {value} - {index === 0 ? neutralized : missed}
      </span>
    );
  };

  const chartData = [
    {
      name: '',
      NEUTRALIZED: neutralized,
      MISSED: missed,
    },
  ];

  return (
    <>
      <ResponsiveContainer width="100%" height="100%" minHeight={90}>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{
            top: 0,
            right: 15,
            left: 10,
          }}
        >
          <XAxis type="number" hide />
          <YAxis hide dataKey="name" type="category" scale="band" />
          <Legend
            align="left"
            iconType="circle"
            iconSize={12}
            formatter={renderPlainLegendText}
          />
          <Bar
            maxBarSize={10}
            dataKey="NEUTRALIZED"
            stackId="a"
            fill="green"
            isAnimationActive={false}
          />
          <Bar
            maxBarSize={10}
            dataKey="MISSED"
            stackId="a"
            fill="red"
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default NeutralizedMissedChart;
