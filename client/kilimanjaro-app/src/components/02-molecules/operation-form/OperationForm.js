import React from 'react';
// Atoms
import ActionButton from '../../01-atoms/action-button/ActionButton';
import AmountInput from '../../01-atoms/amount-input/AmountInput';
import DateInput from '../../01-atoms/date-input/DateInput';
import StringInput from '../../01-atoms/string-input/StringInput';
// Molecules
import LabelsSelector from '../../02-molecules/labels-selector/LabelsSelector';

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

        <DateInput
          value={operation.date}
          onChange={this.setOperationField('date')} />

        <AmountInput
          value={operation.amount}
          onChange={this.setOperationField('amount')} />

        <StringInput
          className="ReferenceInput"
          placeholder="Référence"
          value={operation.reference}
          onChange={this.setOperationField('reference')} />

        <LabelsSelector
          labels={this.props.labels}
          value={operation.labels}
          onChange={this.setOperationField('labels')} />

        <div className="submit-button-container">
          <ActionButton icon="check" size="30" onClick={this.submit} />
        </div>

      </div>
    );
  }

}


export default OperationForm;
