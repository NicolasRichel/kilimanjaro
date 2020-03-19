import React from 'react';
import ActionButton from '../action-button/ActionButton';
import OperationAmountRenderer from '../operation-amount-renderer/OperationAmountRenderer';
import OperationDateRenderer from '../operation-date-renderer/OperationDateRenderer';
import OperationForm from '../operation-form/OperationForm';
import OperationLabelsRenderer from '../operation-labels-renderer/OperationLabelsRenderer';
import OperationReferenceRenderer from '../operation-reference-renderer/OperationReferenceRenderer';
import { ServiceProvider, Services } from '../../services/service-provider';

// Styles
import './OperationsTable.scss';


class OperationsTable extends React.Component {

  constructor(props) {
    super(props);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
    this.operationStore = ServiceProvider.get(Services.OPERATION_STORE);
    this.operationStoreSubscription = null;
    this.state = {
      currentOperation: {}
    };
  }


  setCurrentOperation = (operation) => {
    this.setState({
      currentOperation: operation
    });
  };


  render() {
    return (
      <div className="OperationsTable">

        <div className="header">
          <div className="row header-row">
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
              <span className="cell body-cell column-date">
                <OperationDateRenderer operation={operation} />
              </span>
              <span className="cell body-cell column-amount">
                <OperationAmountRenderer operation={operation} />
              </span>
              <span className="cell body-cell column-reference">
                <OperationReferenceRenderer operation={operation} />
              </span>
              <span className="cell body-cell column-labels">
                <OperationLabelsRenderer
                  operation={operation}
                  labels={this.props.labels} />
              </span>
              <span className="cell body-cell column-actions">
                <ActionButton icon="pen-square" onClick={() => this.setCurrentOperation(operation)} />
                <ActionButton icon="trash" onClick={() => this.props.onDelete(operation)} />
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
