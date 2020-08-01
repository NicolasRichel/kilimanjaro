import React from 'react';
import Actions from '../../../flux/actions';
import Dispatcher from '../../../flux/dispatcher';
// Molecules
import OperationForm from '../../02-molecules/operation-form/OperationForm';
import OperationsTable from '../../02-molecules/operations-table/OperationsTable';
import OperationsToolbar from '../../02-molecules/operations-toolbar/OperationsToolbar';
// Organisms
import GenericContainer from '../generic-container/GenericContainer';

class OperationsManager extends React.Component {

  create = (operation) => Dispatcher.dispatch({
    type: Actions.CREATE_OPERATION, operation
  });

  update = (operation) => Dispatcher.dispatch({
    type: Actions.UPDATE_OPERATION, operation
  });

  delete = (operation) => Dispatcher.dispatch({
    type: Actions.DELETE_OPERATION, operation
  });

  select = (operation, selected) => Dispatcher.dispatch({
    type: Actions.SELECT_OPERATION, operation, selected
  });

  bulkUpdateSetLabel = (label, operations) => Dispatcher.dispatch({
    type: Actions.UPDATE_OPERATIONS_SET_LABEL, label, operations
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
              onSubmit={this.create} />
            <OperationsToolbar
              operations={this.props.operations.filter(op => op.selected)}
              labels={this.props.labels}
              onUpdateLabel={this.bulkUpdateSetLabel} />
            <OperationsTable
              operations={this.props.operations}
              labels={this.props.labels}
              onUpdate={this.update}
              onDelete={this.delete}
              onSelect={this.select} />
          </div>
        }
      />
    );
  }

}

export default OperationsManager;
