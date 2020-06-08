import Actions from '../actions';
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
        this.setState({ dateRange: action.dateRange })
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
          operationsInPeriod: utils.addArrayElement(this.state.operationsInPeriod, createdOperation)
        });
        this._setOperations();
      }
    );
  }

  _updateOperation(operation) {
    BackendService.updateOperation(operation).then(
      updatedOperation => {
        const i = this.state.operationsInPeriod.findIndex(op => op._id === updatedOperation._id);
        this.setState({
          operationsInPeriod: utils.updateArrayElement(this.state.operationsInPeriod, i, updatedOperation)
        });
        this._setOperations();
      }
    );
  }

  _deleteOperation(operation) {
    BackendService.deleteOperation(operation._id).then(
      deletedOperation => {
        const i = this.state.operationsInPeriod.findIndex(op => op._id === deletedOperation._id);
        this.setState({
          operationsInPeriod: utils.removeArrayElement(this.state.operationsInPeriod, i)
        });
        this._setOperations();
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
