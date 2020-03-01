import { ServiceProvider, Services } from '../services/service-provider';
import { Store } from './store';

// Actions
import { Actions } from './actions';


export class OperationStore extends Store {

  backendService;

  constructor() {
    super();
    this.backendService = ServiceProvider.get(Services.BACKEND_SERVICE);
    this.setState({
      operations: []
    });
  }


  handleAction(action) {
    switch (action.type) {
      case Actions.FETCH_OPERATION_LIST:
        this._fetchOperationList();
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
      default: // To avoid warnings in console
    }
  }


  _fetchOperationList() {
    this.backendService.getOperations().then(
      operations => this.setState({ operations })
    );
  }

  _createOperation(operation) {
    this.backendService.createOperation(operation).then(
      createdOperation => this.setState({
        operations: this.state.operations.concat(createdOperation)
      })
    );
  }

  _updateOperation(operation) {
    this.backendService.updateOperation(operation).then(
      updatedOperation => {
        const i = this.state.operations.findIndex(op => op._id === updatedOperation._id);
        this.setState({
          operations: [
            ...this.state.operations.slice(0, i),
            updatedOperation,
            ...this.state.operations.slice(i+1)
          ]
        });
      }
    );
  }

  _deleteOperation(operationID) {
    this.backendService.deleteOperation(operationID).then(
      () => {
        const i = this.state.operations.findIndex(op => op._id === operationID);
        this.setState({
          operations: [
            ...this.state.operations.slice(0, i),
            ...this.state.operations.slice(i+1)
          ]
        });
      }
    );
  }

}
