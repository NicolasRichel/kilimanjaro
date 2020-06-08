import React from 'react';
import Actions from '../../../flux/actions';
import Dispatcher from '../../../flux/dispatcher';
// Molecules
import OperationForm from '../../02-molecules/operation-form/OperationForm';
// Organisms
import GenericContainer from '../generic-container/GenericContainer';

class OperationCreator extends React.Component {

  createOperation = (operation) => Dispatcher.dispatch({
    type: Actions.CREATE_OPERATION, operation
  });

  render() {
    return (
      <GenericContainer
        title="Créer des opérations"
        content={
          <OperationForm
            labels={this.props.labels}
            onSubmit={this.createOperation} />
        }
      />
    );
  }

}

export default OperationCreator;
