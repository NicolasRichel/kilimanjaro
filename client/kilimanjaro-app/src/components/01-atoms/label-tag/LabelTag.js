import React from 'react';

// Styles
import './LabelTag.scss';


function LabelTag(props) {
  const label = props.label;
  return (
    <div className="LabelTag"
      style={{
        backgroundColor: label.color || '#CCC',
        color: label.textColor || '#000'
      }}>
      {label.name}
    </div>
  );
}


export default LabelTag;
