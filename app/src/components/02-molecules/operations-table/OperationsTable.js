import React from 'react';
// Atoms
import ActionButton from '../../01-atoms/action-button/ActionButton';
import AmountRenderer from '../../01-atoms/amount-renderer/AmountRenderer';
import DateRenderer from '../../01-atoms/date-renderer/DateRenderer';
import OperationReferenceRenderer from '../../01-atoms/operation-reference-renderer/OperationReferenceRenderer';
// Molecules
import OperationForm from '../operation-form/OperationForm';
import OperationLabelsRenderer from '../operation-labels-renderer/OperationLabelsRenderer';

// Styles
import './OperationsTable.scss';

class OperationsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentOperation: {}
    };
  }

  setCurrentOperation = (operation) => this.setState({ currentOperation: operation });

  render() {
    return (
      <div className="OperationsTable">

        <div className="header">
          <div className="row header-row">
            <span className="cell header-cell column-select">&nbsp;</span>
            <span className="cell header-cell column-date">Date</span>
            <span className="cell header-cell column-amount">Montant</span>
            <span className="cell header-cell column-reference">Reference</span>
            <span className="cell header-cell column-labels">Labels</span>
            <span className="cell header-cell column-actions">Actions</span>
          </div>
        </div>

        <div className="body">
        {this.props.operations.map(operation =>
          this.state.currentOperation._id === operation._id ? (
            <div key={operation._id} className="row body-row edit-mode">
              <OperationForm
                operation={operation}
                labels={this.props.labels}
                onSubmit={op => {
                  this.props.onUpdate(op);
                  this.setCurrentOperation({});
                }} />
            </div>
          ) : (
            <div key={operation._id} className={
              `row body-row ${operation.amount < 0 ? 'negative' : 'positive'}`
            }>
              <span className="cell body-cell column-select">
                <input type="checkbox"
                  checked={!!operation.selected}
                  onChange={(e) => this.props.onSelect(operation, e.target.checked)} />
              </span>
              <span className="cell body-cell column-date">
                <DateRenderer date={operation.date} />
              </span>
              <span className="cell body-cell column-amount">
                <AmountRenderer amount={operation.amount} />
              </span>
              <span className="cell body-cell column-reference">
                <OperationReferenceRenderer operation={operation} />
              </span>
              <span className="cell body-cell column-labels">
                <OperationLabelsRenderer operation={operation} labels={this.props.labels} />
              </span>
              <span className="cell body-cell column-actions">
                <ActionButton size="24" icon="pen-square"
                  onClick={() => this.setCurrentOperation(operation)} />
                <ActionButton size="24" icon="trash"
                  onClick={() => this.props.onDelete(operation)} />
              </span>
            </div>
          )
        )}
        </div>

      </div>
    );
  }

}

export default OperationsTable;
