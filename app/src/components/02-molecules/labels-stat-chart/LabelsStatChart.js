import React from 'react';
import { VictoryPie, VictoryContainer } from 'victory';

// Styles
import './LabelsStatChart.scss';

function LabelsStatChart(props) {
  const data = props.data.filter(d => d.value > 0);
  const chartData = data.map(d => ({ x: `${d.name}\n${d.value} €\n( ${d.percent}% )`, y: d.value }));
  const colors = data.map(d => d.label.color);
  return (
    <div className="LabelsStatChart">
      <VictoryPie

        containerComponent={<VictoryContainer responsive={false}/>}
        width={600}
        style={{ labels: { fontSize: 12, fontWeight: 'bold' } }}
        innerRadius={100}
        padAngle={4}

        data={chartData}
        colorScale={colors}
      />
    </div>
  );
}

export default LabelsStatChart;
