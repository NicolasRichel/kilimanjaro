import React from 'react';

// Styles
import './TimelineButton.scss';


function TimelineButton(props) {
  return (
    <div className={`TimelineButton ${props.selected ? 'selected' : ''}`}
      title={props.title}
      onClick={props.onClick}>
      {props.text}
    </div>
  );
}


export default TimelineButton;
