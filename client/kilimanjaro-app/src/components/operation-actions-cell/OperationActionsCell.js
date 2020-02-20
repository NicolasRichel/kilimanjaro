import React from 'react';
import { Actions } from '../../flux/actions';
import { ServiceProvider, Services } from '../../services/service-provider';

// Components
import IconButton from '../icon-button/IconButton';

// Styles
import './OperationActionsCell.scss';


class OperationActionsCell extends React.Component {

  constructor(props) {
    super(props);
    this.backendService = ServiceProvider.get(Services.BACKEND_SERVICE);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
  }

  
  updateOperation = () => {
    console.log( `Update operation : ${this.props.operation._id}` );
  };

  deleteOperation = () => {
    const operationID = this.props.operation._id;
    this.backendService.deleteOperation(operationID).then(
      () => this.dispatcher.dispatch({
        type: Actions.DELETE_OPERATION,
        operationID
      })
    );
  };


  render() {
    return (
      <span className="OperationActionsCell">
        <IconButton icon={'pen-square'} onClick={this.updateOperation} />
        <IconButton icon={'trash'} onClick={this.deleteOperation} />
      </span>
    );
  }

}


export default OperationActionsCell;
