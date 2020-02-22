import React from 'react';
import OperationActionsRenderer from '../operation-actions-renderer/OperationActionsRenderer';
import OperationAmountRenderer from '../operation-amount-renderer/OperationAmountRenderer';
import OperationDateRenderer from '../operation-date-renderer/OperationDateRenderer';
import OperationLabelsRenderer from '../operation-labels-renderer/OperationLabelsRenderer';
import OperationReferenceRenderer from '../operation-reference-renderer/OperationReferenceRenderer';

// Services
import { ServiceProvider, Services } from '../../services/service-provider';

// Styles
import './OperationTable.scss';


class OperationTable extends React.Component {

  constructor(props) {
    super(props);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
    this.operationStore = ServiceProvider.get(Services.OPERATION_STORE);
    this.state = {
      rows: []
    };
  }

  componentDidMount() {
    const { state } = this.operationStore.subscribeAndGetState(
      (state) => this.buildRowData( state )
    );
    this.buildRowData( state );
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


  render() {
    return (
      <div className="OperationTable">

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
          <div key={row.id}
            className={`row body-row ${row.operation.amount > 0 ? 'positive' : 'negative'}`}>
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
              <OperationActionsRenderer operation={row.operation} />
            </span>
          </div>
        )}
        </div>

      </div>
    );
  }

}


export default OperationTable;
