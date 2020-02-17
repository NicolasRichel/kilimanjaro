import React from 'react';

// Styles
import './IconButton.scss';


class IconButton extends React.Component {

  styles = {
    size: '28',
    color: '#EEE',
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
        className="IconButton"
        style={{
          width: `${this.styles.size}px`,
          height: `${this.styles.size}px`,
          fontSize: `${this.styles.size/2}px`,
          backgroundColor: this.styles.color,
          color: this.styles.iconColor
        }}>
        <i className={`fas fa-${this.styles.icon}`}></i>
      </div>
    );
  }

}


export default IconButton;
