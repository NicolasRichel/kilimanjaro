import React from 'react';

// Styles
import './DateRenderer.scss';

function DateRenderer(props) {
  return <span className="DateRenderer">{props.date}</span>;
}

export default DateRenderer;
