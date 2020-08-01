import React from 'react';
import * as utils from '../../../utils';

class DayInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ''
    };
  }

  componentDidUpdate() {
    const value = this.props.value || '';
    if (value !== this.state.value) {
      this.setState({ value });
    }
  }


  setValue = (e) => {
    const date = e.target.value;
    this.setState({ value: date });
    this.emitValue( date );
  };

  emitValue = (value) => this.props.onChange && this.props.onChange( value );


  render() {
    const month = this.props.month;
    return (
      <div className="DayInput">
        <span>{month} - </span>
        <select value={this.state.value} onChange={this.setValue}>
          {utils.getMonthDays(month).map(
            d => <option key={d} value={`${month}-${d}`}>{d}</option>
          )}
        </select>
      </div>
    );
  }

}

export default DayInput;
