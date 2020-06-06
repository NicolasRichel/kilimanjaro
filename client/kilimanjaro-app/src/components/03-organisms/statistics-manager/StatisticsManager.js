import React from 'react';
import StatisticsService from '../../../services/statistics-service';
// Atoms
import AmountRenderer from '../../01-atoms/amount-renderer/AmountRenderer';
// Molecules
import LabelsStatChart from '../../02-molecules/labels-stat-chart/LabelsStatChart';
// Organisms
import GenericContainer from '../generic-container/GenericContainer';

// Styles
import './StatisticsManager.scss';

function StatisticsManager(props) {
  const s = StatisticsService.computeStats(props.operations, props.labels);
  const total = s.totalAmount;
  const data = props.labels.map(l => {
    const v = s.totalByLabel[l._id];
    return {
      name: l.name,
      value: v,
      percent: (v/total * 100).toFixed(1),
      label: l
    };
  });
  return (
    <GenericContainer
      title="Statistiques"
      content={
      <div className="StatisticsManager">
        <div className="stats-container">
          <span>Total : </span><AmountRenderer amount={total} />
        </div>
        <div className="chart-container">
          {props.operations.length > 0 && <LabelsStatChart data={data} />}
        </div>
      </div>
      }
    />
  );
}

export default StatisticsManager;
