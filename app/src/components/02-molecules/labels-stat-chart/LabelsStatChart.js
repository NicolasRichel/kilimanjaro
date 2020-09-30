import React from 'react';
import StatisticsService from '../../../services/statistics-service';
import { VictoryPie, VictoryContainer } from 'victory';

function LabelsStatChart(props) {
  let total = StatisticsService._computeTotal(props.operations);
  let totalByLabel = StatisticsService._computeTotalByLabel(props.operations, props.labels);
  let [ data, colors ] = props.labels
    .filter(
      l => totalByLabel[l._id] > 0
    ).map(
      l => ({
        name: l.name,
        value: totalByLabel[l._id],
        percent: (totalByLabel[l._id]/total * 100).toFixed(1),
        color: l.color
      })
    ).reduce(
      (r, d) => [
        r[0].concat({ x: `${d.name}\n${d.value} €\n( ${d.percent}% )`, y: d.value }),
        r[1].concat(d.color)
      ], [ [], [] ]
    );
  return (
    <div className="LabelsStatChart">
      <VictoryPie

        containerComponent={<VictoryContainer responsive={false}/>}
        style={{ labels: { fontSize: 12, fontWeight: 'bold' } }}
        width={300}
        innerRadius={75}
        padAngle={4}

        data={data}
        colorScale={colors}
      />
    </div>
  );
}

export default LabelsStatChart;
