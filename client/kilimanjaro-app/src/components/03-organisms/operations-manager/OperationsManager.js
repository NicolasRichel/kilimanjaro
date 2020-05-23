import React from 'react';
import Actions from '../../../flux/actions';
import Dispatcher from '../../../flux/dispatcher';
// Molecules
import OperationsTable from '../../02-molecules/operations-table/OperationsTable';
// Organisms
import GenericContainer from '../generic-container/GenericContainer';

// Styles
import './OperationsManager.scss';

class OperationsManager extends React.Component {

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
          <OperationsTable
            operations={this.props.operations}
            labels={this.props.labels}
            onUpdate={this.updateOperation}
            onDelete={this.deleteOperation} />
        }
      />
    );
  }

}

export default OperationsManager;
