import React from 'react';
import { VictoryPie, VictoryContainer } from 'victory';

// Styles
import './LabelsStatChart.scss';

class LabelsStatChart extends React.Component {

  render() {
    const data = this.props.data.filter(
      d => d.value > 0
    ).map(d => ({
      x: `${d.name}\n${d.value} €\n( ${d.percent}% )`, y: d.value
    }));
    const colors = this.props.data.map(d => d.label.color);
    return (
      <div className="LabelsStatChart">
        <VictoryPie

          containerComponent={<VictoryContainer responsive={false}/>}
          width={600}
          style={{ labels: { fontSize: 12, fontWeight: 'bold' } }}
          innerRadius={100}
          padAngle={4}

          data={data}
          colorScale={colors}
        />
      </div>
    );
  }
}

export default LabelsStatChart;
