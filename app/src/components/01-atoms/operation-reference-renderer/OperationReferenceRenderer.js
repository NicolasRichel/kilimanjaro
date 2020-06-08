import React from 'react';

// Styles
import './OperationReferenceRenderer.scss';


function OperationReferenceRenderer(props) {
  const reference = props.operation.reference;
  return <span className="OperationReferenceRenderer">{reference}</span>;
}


export default OperationReferenceRenderer;
