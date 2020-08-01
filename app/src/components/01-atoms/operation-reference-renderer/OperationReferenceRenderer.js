import React from 'react';

function OperationReferenceRenderer(props) {
  const reference = props.operation.reference;
  return <span className="OperationReferenceRenderer">{reference}</span>;
}

export default OperationReferenceRenderer;
