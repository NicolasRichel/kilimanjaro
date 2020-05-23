import React from 'react';
import { Actions } from '../../../flux/actions';
import Dispatcher from '../../../flux/dispatcher';
// Molecules
import OperationForm from '../../02-molecules/operation-form/OperationForm';
import OperationsTable from '../../02-molecules/operations-table/OperationsTable';
// Organisms
import GenericContainer from '../generics/generic-container/GenericContainer';

// Styles
import './OperationsManager.scss';

class OperationsManager extends React.Component {

  constructor(props) {
    super(props);
  }

  createOperation = (operation) => Dispatcher.dispatch({
    type: Actions.CREATE_OPERATION, operation
  });

  updateOperation = (operation) => Dispatcher.dispatch({
    type: Actions.UPDATE_OPERATION, operation
  });

  deleteOperation = (operation) => Dispatcher.dispatch({
    type: Actions.DELETE_OPERATION, operation
  });

  render() {
    return (
      <GenericContainer
        title="Liste des opérations"
        content={
        <div>
          <OperationForm
            labels={this.props.labels}
            onSubmit={this.createOperation} />
          <OperationsTable
            operations={this.props.operations}
            labels={this.props.labels}
            onUpdate={this.updateOperation}
            onDelete={this.deleteOperation} />
        </div>}
      />
    );
  }

}

export default OperationsManager;
