import React from 'react';

// Styles
import './ReferenceInput.scss';


class ReferenceInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ''
    };
  }


  setReference = (e) => {
    const reference = e.target.value;
    this.setState({ value: reference });
    this.props.onChange && this.props.onChange( reference );
  };


  render() {
    return (
      <div className="RefInput">
        <input type="text" placeholder="Référence"
          value={this.state.value}
          onChange={this.setReference}
        />
      </div>
    );
  }

}


export default ReferenceInput;
