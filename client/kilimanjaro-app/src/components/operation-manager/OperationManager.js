import React from 'react';
import { Actions } from '../../flux/actions';
import OperationForm from '../operation-form/OperationForm';
import OperationTable from '../operation-table/OperationTable';
import { ServiceProvider, Services } from '../../services/service-provider';

// Styles
import './OperationManager.scss';


class OperationManager extends React.Component {

  constructor(props) {
    super(props);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
  }


  createOperation = (operation) => this.dispatcher.dispatch({
    type: Actions.CREATE_OPERATION,
    operation
  });


  render() {
    return (
      <div className="OperationManager">
        <OperationForm onSubmit={this.createOperation} />
        <OperationTable />
      </div>
    );
  }

}


export default OperationManager;
