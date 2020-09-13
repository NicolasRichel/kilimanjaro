import React from 'react';
import { VictoryBar, VictoryChart, VictoryContainer, VictoryTheme } from 'victory';

function TimeEvolutionStatChart(props) {
  const chartData = props.data;
  return (
    <div className="TimeEvolutionStatChart">
      <VictoryChart
        containerComponent={<VictoryContainer responsive={false}/>}
        theme={VictoryTheme.material}
        width={700}>

        <VictoryBar
          style={{ data: { fill: '#444' } }}
          alignment="middle"
          data={chartData} 
        />

      </VictoryChart>
    </div>
  );
}

export default TimeEvolutionStatChart;
