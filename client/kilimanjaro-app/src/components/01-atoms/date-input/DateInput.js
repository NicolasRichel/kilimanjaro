import React from 'react';

// Styles
import './DateInput.scss';


class DateInput extends React.Component {

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
    return (
      <div className="DateInput">
        <input type="date"
          value={this.state.value}
          onChange={this.setValue}
        />
      </div>
    );
  }

}


export default DateInput;
