import React from 'react';

// Styles
import './ToolbarButton.scss';


function ToolbarButton(props) {
  return (
    <div className="ToolbarButton"
      title={props.title}
      onClick={props.onClick}>
      <i className={`fas fa-${props.icon}`}></i>
    </div>
  );
}


export default ToolbarButton;
