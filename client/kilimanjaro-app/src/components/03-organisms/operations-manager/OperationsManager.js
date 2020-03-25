import React from 'react';
import { Actions } from '../../../flux/actions';
import { ServiceProvider, Services } from '../../../services/service-provider';
// Molecules
import OperationForm from '../../02-molecules/operation-form/OperationForm';
import OperationsTable from '../../02-molecules/operations-table/OperationsTable';

// Styles
import './OperationsManager.scss';


class OperationsManager extends React.Component {

  constructor(props) {
    super(props);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
    this.operationStore = ServiceProvider.get(Services.OPERATION_STORE);
    this.operationStoreSubscription = null;
    this.labelStore = ServiceProvider.get(Services.LABEL_STORE);
    this.labelStoreSubscritpion = null;
    this.state = {
      operations: [],
      labels: []
    }
  }

  componentDidMount() {
    this.operationStoreSubscription = this.operationStore.subscribe(
      state => this.setState({ operations: state.operations })
    );
    this.labelStoreSubscritpion = this.labelStore.subscribe(
      state => this.setState({ labels: state.labels })
    );
    this.setState({
      operations: this.operationStore.getState().operations,
      labels: this.labelStore.getState().labels
    });
  }

  componentWillUnmount() {
    this.operationStore.unsubscribe( this.operationStoreSubscription );
    this.labelStore.unsubscribe( this.labelStoreSubscritpion );
  }


  createOperation = (operation) => this.dispatcher.dispatch({
    type: Actions.CREATE_OPERATION,
    operation
  });

  updateOperation = (operation) => this.dispatcher.dispatch({
    type: Actions.UPDATE_OPERATION,
    operation
  });

  deleteOperation = (operation) => this.dispatcher.dispatch({
    type: Actions.DELETE_OPERATION,
    operationID: operation._id
  });


  render() {
    return (
      <div className="OperationsManager">
        <OperationForm
          labels={this.state.labels}
          onSubmit={this.createOperation} />
        <OperationsTable
          operations={this.state.operations}
          labels={this.state.labels}
          onUpdate={this.updateOperation}
          onDelete={this.deleteOperation} />
      </div>
    );
  }

}


export default OperationsManager;
