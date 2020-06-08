import React from 'react';
// Atoms
import LabelTag from '../../01-atoms/label-tag/LabelTag';

// Styles
import './OperationLabelsRenderer.scss';


function OperationLabelsRenderer(props) {
  const operationLabels = props.operation.labels || [];
  return (
    <span className="OperationLabelsRenderer">
      {props.labels.filter(
        l => operationLabels.includes(l._id)
      ).map(label =>
        <LabelTag key={label._id} label={label} />
      )}
    </span>
  );
}


export default OperationLabelsRenderer;
