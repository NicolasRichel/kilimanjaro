import React from 'react';
import AmountInput from '../amount-input/AmountInput';
import DateInput from '../date-input/DateInput';
import IconButton from '../icon-button/IconButton';
import LabelsSelector from '../labels-selector/LabelsSelector';
import ReferenceInput from '../reference-input/ReferenceInput';
import { Actions } from '../../flux/actions';

// Services
import { ServiceProvider, Services } from '../../services/service-provider';

// Styles
import './OperationForm.scss';


class OperationForm extends React.Component {

  constructor(props) {
    super(props);
    this.backendService = ServiceProvider.get(Services.BACKEND_SERVICE);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
    this.state = {
      operation: this.props.operation || {}
    };
  }


  setOperationField = (field) => {
    return (value) => this.setState({
      operation: {
        ...this.state.operation,
        [field]: value
      }
    });
  };

  validate = () => {
    const op =this.state.operation;
    return (!!op.date && !!op.amount && !!op.reference);
  };

  submit = () => {
    if (this.validate()) {
      this.backendService.createOperation( this.state.operation ).then(
        (operation) => this.dispatcher.dispatch({
          type: Actions.CREATE_OPERATION,
          operation
        })
      );
    }
  };


  render() {
    return (
      <div className="OperationForm">
        <DateInput onChange={this.setOperationField('date')} />
        <AmountInput onChange={this.setOperationField('amount')} />
        <ReferenceInput onChange={this.setOperationField('reference')} />
        <LabelsSelector onChange={this.setOperationField('labels')} />
        <IconButton icon={'plus-square'} size="30" onClick={this.submit} />
      </div>
    );
  }

}


export default OperationForm;
