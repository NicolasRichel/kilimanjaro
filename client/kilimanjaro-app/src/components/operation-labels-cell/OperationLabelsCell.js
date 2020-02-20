import React from 'react';
import LabelMark from '../label-mark/LabelMark';

// Styles
import './OperationLabelsCell.scss';


function OperationLabelsCell(props) {
  const labels = props.operation.labels;
  return (
    <span className="OperationLabelsCell">
      {labels.map(label => <LabelMark key={label._id} label={label} />)}
    </span>
  );
}


export default OperationLabelsCell;
