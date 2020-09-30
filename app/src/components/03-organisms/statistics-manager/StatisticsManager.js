import React from 'react';
import StatisticsService from '../../../services/statistics-service';
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
  const total = StatisticsService._computeTotal(props.operations);
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
            <LabelsStatChart
              operations={props.operations}
              labels={props.labels} />
            <TimeEvolutionStatChart
              operations={props.operations}
              dateRange={props.dateRange} />
          </div>
        )}
      </div>
      }
    />
  );
}

export default StatisticsManager;
