import React from 'react';
import { VictoryPie, VictoryContainer } from 'victory';

function LabelsStatChart(props) {
  const data = props.data.filter(d => d.value > 0);
  const chartData = data.map(d => ({ x: `${d.name}\n${d.value} €\n( ${d.percent}% )`, y: d.value }));
  const colors = data.map(d => d.label.color);
  return (
    <div className="LabelsStatChart">
      <VictoryPie

        containerComponent={<VictoryContainer responsive={false}/>}
        style={{ labels: { fontSize: 12, fontWeight: 'bold' } }}
        width={300}
        innerRadius={75}
        padAngle={4}

        data={chartData}
        colorScale={colors}
      />
    </div>
  );
}

export default LabelsStatChart;
