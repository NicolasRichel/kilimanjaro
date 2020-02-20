import React from 'react';

// Styles
import './LabelMark.scss';


function LabelMark(props) {
  const label = props.label;
  return (
    <div className="LabelMark"
      style={{
        backgroundColor: label.color || '#CCC',
        color: label.textColor || '#000'
      }}>
      {label.name}
    </div>
  );
}


export default LabelMark;
