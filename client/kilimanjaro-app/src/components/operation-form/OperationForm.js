import React from 'react';
import AmountInput from '../amount-input/AmountInput';
import DateInput from '../date-input/DateInput';
import IconButton from '../icon-button/IconButton';
import LabelsSelector from '../labels-selector/LabelsSelector';
import StringInput from '../string-input/StringInput';

// Styles
import './OperationForm.scss';


class OperationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      operation: props.operation || {}
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
    const op = this.state.operation;
    return (!!op.date && !!op.amount && !!op.reference);
  };

  submit = () => {
    if (this.validate()) {
      this.props.onSubmit( this.state.operation );
      this.clear();
    }
  };

  clear = () => this.setState({
    operation: {}
  });


  render() {
    const operation = this.state.operation;
    return (
      <div className="OperationForm">
        <DateInput value={operation.date}
          onChange={this.setOperationField('date')} />
        <AmountInput value={operation.amount}
          onChange={this.setOperationField('amount')} />
        <StringInput value={operation.reference}
          onChange={this.setOperationField('reference')}
          className="ReferenceInput" placeholder="Référence" />
        <LabelsSelector value={operation.labels}
          onChange={this.setOperationField('labels')} />
        <div className="submit-button-container">
          <IconButton icon="check" size="30" onClick={this.submit} />
        </div>
      </div>
    );
  }

}


export default OperationForm;
