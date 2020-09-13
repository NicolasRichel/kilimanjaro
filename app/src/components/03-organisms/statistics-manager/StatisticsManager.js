import React from 'react';
import StatisticsService from '../../../services/statistics-service';
import * as utils from '../../../utils';
// Atoms
import AmountRenderer from '../../01-atoms/amount-renderer/AmountRenderer';
// Molecules
import LabelsStatChart from '../../02-molecules/labels-stat-chart/LabelsStatChart';
import TimeEvolutionStatChart from '../../02-molecules/time-evolution-stat-chart/TimeEvolutionStatChart';
// Organisms
import GenericContainer from '../generic-container/GenericContainer';

// Styles
import './StatisticsManager.scss';

function StatisticsManager(props) {
  let dates = [];
  if (props.dateRange[0])
    dates = utils.getMonthDates(props.dateRange[0]);
  const s = StatisticsService.computeAll(props.operations, dates, props.labels);
  const total = s.total;
  const data0 = props.labels.map(l => {
    const v = s.totalByLabel[l._id];
    return {
      name: l.name,
      value: v,
      percent: (v/total * 100).toFixed(1),
      label: l
    };
  });
  const data1 = Object.entries(s.totalByDate).map(
    e => ({ x: utils.getDay(e[0]), y: e[1] })
  );
  return (
    <GenericContainer
      title="Statistiques"
      content={
      <div className="StatisticsManager">
        <div className="stats-container">
          <span>Total : </span><AmountRenderer amount={total} />
        </div>
        {props.operations.length > 0 && (
          <div className="chart-container">
            <LabelsStatChart data={data0} />
            <TimeEvolutionStatChart data={data1} />
          </div>
        )}
      </div>
      }
    />
  );
}

export default StatisticsManager;
