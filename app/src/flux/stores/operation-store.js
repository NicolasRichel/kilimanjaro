import Actions from '../actions';
import Dispatcher from '../dispatcher';
import BackendService from '../../services/backend-service';
import { Store } from '../store';
import * as utils from '../../utils';

class OperationStore extends Store {

  constructor() {
    super();
    this.setState({
      period: [],
      dateRange: [],
      operationsInPeriod: []
    });
    this.setData({
      operations: []
    });
  }

  handleAction(action) {
    switch (action.type) {
      case Actions.SET_PERIOD:
        this._fetchOperationsByPeriod(action.period);
        break;
      case Actions.SET_DATE_RANGE:
        this.setState({ dateRange: action.dateRange });
        this._setOperations();
        break;
      case Actions.CREATE_OPERATION:
        this._createOperation(action.operation);
        break;
      case Actions.UPDATE_OPERATION:
        this._updateOperation(action.operation);
        break;
      case Actions.DELETE_OPERATION:
        this._deleteOperation(action.operation);
        break;
      case Actions.SELECT_OPERATION:
        this._selectOperation(action.operation, action.selected);
        break;
      case Actions.UPDATE_OPERATIONS_SET_LABEL:
        this._updateOperationsSetLabel(action.label, action.operations);
        break;
    }
  }

  _fetchOperationsByPeriod(period) {
    BackendService.getOperationsByPeriod(period[0], period[1]).then(
      operations => {
        this.setState({
          period,
          dateRange: [ utils.getFirstDayOfMonth(period[1]), period[1] ],
          operationsInPeriod: operations
        });
        this._setOperations();
      }
    );
  }

  _createOperation(operation) {
    BackendService.createOperation(operation).then(
      createdOperation => {
        this.setState({
          operationsInPeriod: utils.addArrayElement(
            this.state.operationsInPeriod, createdOperation
          )
        });
        this._setOperations();
      }
    );
  }

  _updateOperation(operation) {
    BackendService.updateOperation(operation).then(
      updatedOperation => {
        updatedOperation.selected = operation.selected;
        this.setState({
          operationsInPeriod: utils.updateArrayElement(
            this.state.operationsInPeriod, updatedOperation
          )
        });
        this._setOperations();
      }
    );
  }

  _deleteOperation(operation) {
    BackendService.deleteOperation(operation._id).then(
      deletedOperation => {
        this.setState({
          operationsInPeriod: utils.removeArrayElement(
            this.state.operationsInPeriod, deletedOperation
          )
        });
        this._setOperations();
      }
    );
  }

  _selectOperation(operation, selected) {
    const updatedOperation = { ...operation, selected };
    this.setState({
      operationsInPeriod: utils.updateArrayElement(
        this.state.operationsInPeriod, updatedOperation
      )
    });
    this.setData({
      operations: utils.updateArrayElement(
        this.data.operations, updatedOperation
      )
    });
  }

  _updateOperationsSetLabel(label, operations) {
    BackendService.updateOperationsSetLabel(
      label, operations.map(op => op._id)
    ).then(
      res => {
        operations.forEach(op => op.labels.push(label));
        this.setState({
          operationsInPeriod: utils.updateArrayElements(
            this.state.operationsInPeriod, operations
          )
        });
        this._setOperations();
        Dispatcher.dispatch({
          type: Actions.NOTIFY,
          notification: {
            type: 'info', message: res.message
          }
        });
      }
    );
  }

  _setOperations() {
    const dateRange = this.state.dateRange;
    const operations = this.state.operationsInPeriod
      .filter( op => op.date >= dateRange[0] && op.date <= dateRange[1] )
      .sort( (o1, o2) => o1.date < o2.date );
    this.setData({ operations });
  }

}

export default new OperationStore();
