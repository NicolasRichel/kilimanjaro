import React from 'react';

// Styles
import './ActionButton.scss';


class ActionButton extends React.Component {

  styles = {
    size: '28',
    color: '#EEE',
    textColor: '#000',
    iconColor: '#000',
    icon: 'question-circle'
  };

  constructor(props) {
    super(props);
    Object.assign(this.styles, props);
  }


  render() {
    return (
      <div
        onClick={this.props.onClick}
        className="ActionButton"
        style={{
          minWidth: `${this.styles.size}px`,
          height: `${this.styles.size}px`,
          fontSize: `${this.styles.size/2}px`,
          backgroundColor: this.styles.color
        }}>
        <i className={`fas fa-${this.styles.icon}`}
          style={{ color: this.styles.iconColor }}>
        </i>
        <span
          style={{ color: this.styles.textColor }}>
          {this.props.text}
        </span>
      </div>
    );
  }

}


export default ActionButton;
