import React from 'react';

// Styles
import './StringInput.scss';


class StringInput extends React.Component {

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
    const reference = e.target.value;
    this.setState({ value: reference });
    this.emitValue( reference );
  };

  emitValue = (value) => this.props.onChange && this.props.onChange( value );


  render() {
    return (
      <div className={`StringInput ${this.props.className}`}>
        <input type="text"
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.setValue}
        />
      </div>
    );
  }

}


export default StringInput;
