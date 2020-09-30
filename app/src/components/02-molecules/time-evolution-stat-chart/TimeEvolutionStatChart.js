import React from 'react';
import StatisticsService from '../../../services/statistics-service';
import * as utils from '../../../utils';
import { VictoryBar, VictoryChart, VictoryContainer, VictoryTheme } from 'victory';

function TimeEvolutionStatChart(props) {
  const dates = utils.getMonthDates(props.dateRange[0]);
  const totalByDate = StatisticsService._computeTotalByDate(props.operations, dates);
  const data = Object.entries(totalByDate).map(
    e => ({ x: utils.getDay(e[0]), y: e[1] })
  );
  return (
    <div className="TimeEvolutionStatChart">
      <VictoryChart
        containerComponent={<VictoryContainer responsive={false}/>}
        theme={VictoryTheme.material}
        width={700}>

        <VictoryBar
          style={{ data: { fill: '#444' } }}
          alignment="middle"
          data={data} 
        />

      </VictoryChart>
    </div>
  );
}

export default TimeEvolutionStatChart;
