import { Actions } from '../actions';
import { ServiceProvider, Services } from '../../service-provider';
import { Store } from '../store';
import * as utils from '../../utils';


export class OperationStore extends Store {

  backendService;

  constructor() {
    super();
    this.backendService = ServiceProvider.get(Services.BACKEND_SERVICE);
    this.setState({
      operationsGroupedByMonth: {},
      operations: []
    });
  }


  handleAction(action) {
    switch (action.type) {
      case Actions.FETCH_ALL_OPERATIONS:
        this._fetchAllOperations();
        break;
      case Actions.FETCH_OPERATIONS_GROUPED_BY_MONTH:
        this._fecthOperationsGroupedByMonth(action.start, action.end);
        break;
      case Actions.SET_OPERATIONS:
        this.setState({ operations: action.operations });
        break;
      case Actions.CREATE_OPERATION:
        this._createOperation(action.operation);
        break;
      case Actions.UPDATE_OPERATION:
        this._updateOperation(action.operation);
        break;
      case Actions.DELETE_OPERATION:
        this._deleteOperation(action.operationID);
        break;
    }
  }


  _fetchAllOperations() {
    this.backendService.getAllOperations().then(
      operations => this.setState({ operations })
    );
  }

  _fecthOperationsGroupedByMonth(start, end) {
    this.backendService.getOperationsGroupedByPeriod(start, end, '1m').then(
      response => {
        const operationsGroupedByMonth = {};
        Object.keys(response).forEach(period => {
          const month = period.split('_')[0].slice(0, -3);
          operationsGroupedByMonth[ month ] = response[period];
        });
        this.setState({ operationsGroupedByMonth });
      }
    );
  }

  _createOperation(operation) {
    this.backendService.createOperation(operation).then(
      createdOperation => this.setState({
        operations: utils.addArrayElement(this.state.operations, createdOperation)
      })
    );
  }

  _updateOperation(operation) {
    this.backendService.updateOperation(operation).then(
      updatedOperation => {
        const i = this.state.operations.findIndex(op => op._id === updatedOperation._id);
        this.setState({
          operations: utils.updateArrayElement(this.state.operations, i, updatedOperation)
        });
      }
    );
  }

  _deleteOperation(operationID) {
    this.backendService.deleteOperation(operationID).then(
      deletedOperation => {
        const i = this.state.operations.findIndex(op => op._id === operationID);
        this.setState({
          operations: utils.removeArrayElement(this.state.operations, i)
        });
      }
    );
  }

}
