import React from 'react';

// Styles
import './ActionButton.scss';

class ActionButton extends React.Component {

  // Default styles
  styles = {
    size: '28',
    color: '#EEE',
    textColor: '#000',
    icon: 'question-circle'
  };

  constructor(props) {
    super(props);
    Object.assign(this.styles, props);
  }

  render() {
    return (
      <div
        className="ActionButton"
        onClick={this.props.onClick}
        style={{
          minWidth: `${this.styles.size}px`,
          height: `${this.styles.size}px`,
          fontSize: `${this.styles.size/2}px`,
          backgroundColor: this.styles.color,
          color: this.styles.textColor
        }}>
        <i className={`fas fa-${this.styles.icon}`}></i>
        <span>{this.props.text}</span>
      </div>
    );
  }

}

export default ActionButton;
