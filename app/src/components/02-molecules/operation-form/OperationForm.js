import React from 'react';
// Atoms
import ActionButton from '../../01-atoms/action-button/ActionButton';
import AmountInput from '../../01-atoms/amount-input/AmountInput';
import DateInput from '../../01-atoms/date-input/DateInput';
import DayInput from '../../01-atoms/day-input/DayInput';
import StringInput from '../../01-atoms/string-input/StringInput';
// Molecules
import LabelsSelector from '../labels-selector/LabelsSelector';

// Styles
import './OperationForm.scss';

class OperationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      operation: props.operation || {}
    };
  }


  setField = (field) => {
    return (value) => this.setState({
      operation: {
        ...this.state.operation,
        [field]: value
      }
    });
  };

  validate = () => {
    const op = this.state.operation;
    return (!!op.date && op.amount > 0 && !!op.reference && op.labels.length === 1);
  };

  submit = () => {
    if (this.validate()) {
      this.props.onSubmit( this.state.operation );
      this.clear();
    }
  };

  clear = () => this.setState({ operation: {} });


  render() {
    const operation = this.state.operation;
    return (
      <div className="OperationForm">

      {this.props.month ? (
        <DayInput
          month={this.props.month}
          value={operation.date}
          onChange={this.setField('date')} />
      ) : (
        <DateInput
          value={operation.date}
          onChange={this.setField('date')} />
      )}

        <AmountInput
          value={operation.amount}
          onChange={this.setField('amount')} />

        <StringInput
          className="ReferenceInput"
          placeholder="Référence"
          value={operation.reference}
          onChange={this.setField('reference')} />

        <LabelsSelector
          labels={this.props.labels}
          value={operation.labels}
          onChange={this.setField('labels')} />

        <div className="submit-button-container">
          <ActionButton icon="check" size="30" onClick={this.submit} />
        </div>

      </div>
    );
  }

}

export default OperationForm;
