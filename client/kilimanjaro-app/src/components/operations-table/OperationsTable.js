import React from 'react';
import { Actions } from '../../flux/actions';
import OperationActionsRenderer from '../operation-actions-renderer/OperationActionsRenderer';
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
      rows: []
    };
  }

  componentDidMount() {
    const s = this.operationStore.subscribeAndGetState(
      (state) => this.buildRowData( state )
    );
    this.operationStoreSubscription = s.subscriptionKey;
    this.buildRowData( s.state );
  }

  componentWillUnmount() {
    this.operationStore.unsubscribe( this.operationStoreSubscription );
  }


  buildRowData(data) {
    this.setState({
      rows: data.operations.map(op => ({
        id: op._id,
        editMode: false,
        operation: op
      }))
    });
  }

  updateOperation = (operation) => this.dispatcher.dispatch({
    type: Actions.UPDATE_OPERATION,
    operation
  });

  deleteOperation = (operation) => this.dispatcher.dispatch({
    type: Actions.DELETE_OPERATION,
    operationID: operation._id
  });

  toggleEditMode = (row) => {
    const i = this.state.rows.findIndex(r => r.id === row.id);
    this.setState({
      rows: [
        ...this.state.rows.slice(0, i),
        Object.assign(row, { editMode: !row.editMode }),
        ...this.state.rows.slice(i+1)
      ]
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
        {this.state.rows.map(row =>
          row.editMode ? (
            <div key={row.id} className="row body-row edit-mode">
              <OperationForm operation={row.operation}
                onSubmit={(op) => {
                  this.updateOperation(op);
                  this.toggleEditMode(row);
                }} />
            </div>
          ) : (
            <div key={row.id} className={
              `row body-row ${row.operation.amount < 0 ? 'negative' : 'positive'}`
            }>
              <span className="cell body-cell column-date">
                <OperationDateRenderer operation={row.operation} />
              </span>
              <span className="cell body-cell column-amount">
                <OperationAmountRenderer operation={row.operation} />
              </span>
              <span className="cell body-cell column-reference">
                <OperationReferenceRenderer operation={row.operation} />
              </span>
              <span className="cell body-cell column-labels">
                <OperationLabelsRenderer operation={row.operation} />
              </span>
              <span className="cell body-cell column-actions">
                <OperationActionsRenderer operation={row.operation}
                  onUpdateClick={() => this.toggleEditMode(row)}
                  onDeleteClick={this.deleteOperation} />
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
