import React from 'react';
import StatisticsService from '../../../services/statistics-service';
// Atoms
import LabelTag from '../../01-atoms/label-tag/LabelTag';
// Organisms
import GenericContainer from '../generic-container/GenericContainer';

// Styles
import './StatisticsManager.scss';
import AmountRenderer from '../../01-atoms/amount-renderer/AmountRenderer';

function StatisticsManager(props) {
  const s = StatisticsService.computeTotals(props.operations, props.labels);
  return (
    <GenericContainer
      title="Statistiques"
      content={
      <div>
        <div>
          <span>Total : </span>
          <AmountRenderer amount={s.totalAmount} />
        </div>
        {props.labels.map(label => (
          <div key={label._id}>
            <span>Total <LabelTag label={label} /> : </span>
            <AmountRenderer amount={s.totalByLabel[label._id]} />
          </div>
        ))}
      </div>
      }
    />
  );
}

export default StatisticsManager;
