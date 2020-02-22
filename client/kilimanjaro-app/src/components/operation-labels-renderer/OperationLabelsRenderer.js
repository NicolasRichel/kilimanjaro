import React from 'react';
import LabelMark from '../label-mark/LabelMark';

// Styles
import './OperationLabelsRenderer.scss';


function OperationLabelsRenderer(props) {
  const labels = props.operation.labels;
  return (
    <span className="OperationLabelsRenderer">
      {labels.map(label => <LabelMark key={label._id} label={label} />)}
    </span>
  );
}


export default OperationLabelsRenderer;
