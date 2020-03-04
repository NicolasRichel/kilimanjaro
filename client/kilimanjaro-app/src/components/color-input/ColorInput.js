import React from 'react';

// Styles
import './ColorInput.scss';


class ColorInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name || '',
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
    const color = e.target.value;
    this.setState({ value: color });
    this.emitValue( color );
  }

  emitValue = (value) => this.props.onChange && this.props.onChange( value );


  render() {
    return (
      <div className="ColorInput">
        <input type="color"
          value={this.state.value}
          onChange={this.setValue}
        />
      </div>
    );
  }

}


export default ColorInput;
