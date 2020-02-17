import React from 'react';
import OperationActionsCell from '../operation-actions-cell/OperationActionsCell';
import OperationAmountCell from '../operation-amount-cell/OperationAmountCell';
import OperationDateCell from '../operation-date-cell/OperationDateCell';
import OperationLabelsCell from '../operation-labels-cell/OperationLabelsCell';
import OperationRefCell from '../operation-ref-cell/OperationRefCell';

// Services
import { ServiceProvider, Services } from '../../services/service-provider';

// Styles
import './OperationTable.scss';


const tableDefinition = {
  columns: [
    {
      id: 'date',
      name: 'Date',
      cellComponent: (obj) => <OperationDateCell operation={obj}/>
    },
    {
      id: 'amount',
      name: 'Montant',
      cellComponent: (obj) => <OperationAmountCell operation={obj}/>
    },
    {
      id: 'ref',
      name: 'Référence',
      cellComponent: (obj) => <OperationRefCell operation={obj}/>
    },
    {
      id: 'labels',
      name: 'Libellés',
      cellComponent: (obj) => <OperationLabelsCell operation={obj}/>
    },
    {
      id: 'actions',
      name: 'Actions',
      cellComponent: (obj) => <OperationActionsCell operation={obj}/>
    }
  ]
};


class OperationTable extends React.Component {

  constructor(props) {
    super(props);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
    this.operationStore = ServiceProvider.get(Services.OPERATION_STORE);
    this.state = {
      columns: tableDefinition.columns,
      operations: []
    };
  }

  componentDidMount() {
    const { state } = this.operationStore.subscribeAndGetState(
      (state) => this.setState({ operations: state.operations })
    );
    this.setState({ state });
  }


  render() {
    return (
      <div className="OperationTable">

        <div className="header">
          {this.state.columns.map(col =>
            <span key={col.id} className={`cell column-${col.id}`}>
              {col.name}
            </span>
          )}
        </div>

        <div className="body">
        {this.state.operations.map(op =>
          <div key={op._id} className={`row ${op.amount > 0 ? 'positive' : 'negative'}`}>
            {this.state.columns.map(col => 
              <span key={col.id} className={`cell column-${col.id}`}>
                {col.cellComponent(op)}
              </span>
            )}
          </div>
        )}
        </div>

      </div>
    );
  }

}


export default OperationTable;
