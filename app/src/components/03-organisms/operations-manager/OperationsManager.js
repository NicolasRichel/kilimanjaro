import React from 'react';
import Actions from '../../../flux/actions';
import Dispatcher from '../../../flux/dispatcher';
// Molecules
import OperationForm from '../../02-molecules/operation-form/OperationForm';
import OperationsTable from '../../02-molecules/operations-table/OperationsTable';
// Organisms
import GenericContainer from '../generic-container/GenericContainer';

// Styles
import './OperationsManager.scss';

class OperationsManager extends React.Component {

  createOperation = (operation) => Dispatcher.dispatch({
    type: Actions.CREATE_OPERATION, operation
  });

  updateOperation = (operation) => Dispatcher.dispatch({
    type: Actions.UPDATE_OPERATION, operation
  });

  deleteOperation = (operation) => Dispatcher.dispatch({
    type: Actions.DELETE_OPERATION, operation
  });

  selectOperation = (operation, selected) => Dispatcher.dispatch({
    type: Actions.SELECT_OPERATION, operation, selected
  });

  render() {
    const month = this.props.dateRange.length > 0 ? this.props.dateRange[0].slice(0, -3) : '';
    return (
      <GenericContainer
        title="Liste des opérations"
        content={
          <div>
            <OperationForm
              labels={this.props.labels}
              month={month}
              onSubmit={this.createOperation} />
            <OperationsTable
              operations={this.props.operations}
              labels={this.props.labels}
              onUpdate={this.updateOperation}
              onDelete={this.deleteOperation}
              onSelect={this.selectOperation} />
          </div>
        }
      />
    );
  }

}

export default OperationsManager;
