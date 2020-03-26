import React from 'react';

// Styles
import './AmountInput.scss';


class AmountInput extends React.Component {

  constructor(props) {
    super(props);
    const amount = props.value;
    this.state = {
      isNegative: (amount || amount === 0) && (amount < 0),
      value: (amount || amount === 0) ? ''+amount : ''
    };
  }

  componentDidUpdate() {
    const amount = this.props.value;
    let value = '';
    if (amount) {
      const s = this.state.value.match(/\.0?$/);
      value = `${amount}${s ? s[0] : ''}`;
    } else if (amount === 0) {
      value = this.state.value;
    }
    if (value !== this.state.value) {
      this.setState({ value, isNegative: (amount < 0) });
    }
  }


  setValue = (e) => {
    let value = e.target.value;
    let amount = 0;
    if (value) {
      if (value.match(/^[-+]?(\d*)([.,]\d?\d?)?$/)) {
        value = value.replace(',', '.');
        amount = parseFloat( value );
        amount = Number.isNaN(amount) ? 0 : amount;
        this.setState({ value, isNegative: (amount < 0) });
        this.emitValue( amount );
      }
    } else {
      this.setState({ value: '' });
      this.emitValue( amount );
    }
  };

  emitValue = (value) => this.props.onChange && this.props.onChange( value );


  render() {
    return (
      <div className="AmountInput">
        <input
          className={`${this.state.isNegative ? 'negative' : 'positive'}`}
          value={this.state.value}
          onChange={this.setValue}
        />
      </div>
    );
  }

}


export default AmountInput;
