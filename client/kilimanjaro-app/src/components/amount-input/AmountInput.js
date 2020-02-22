import React from 'react';

// Styles
import './AmountInput.scss';


class AmountInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isNegative: false,
      value: props.value || ''
    };
  }


  setAmount = (e) => {
    let value = e.target.value;
    let amount = 0;
    if (value && value.match(/^[-+]?(\d*)([.,]\d?\d?)?$/)) {
      value = value.replace(',', '.');
      amount = parseFloat( value );
      this.setState({ value, isNegative: (amount < 0) });
    } else if (!value) {
      this.setState({ value: '' });
    }
    this.props.onChange && this.props.onChange( amount );
  };


  render() {
    return (
      <div className="AmountInput">
        <input
          className={`${this.state.isNegative ? 'negative' : 'positive'}`}
          value={this.state.value}
          onChange={this.setAmount}
        />
      </div>
    );
  }

}


export default AmountInput;
