import React from 'react';

// Styles
import './OperationDateRenderer.scss';


function OperationDateRenderer(props) {
  const date = props.operation.date;
  return <span className="OperationDateRenderer">{date}</span>;
}


export default OperationDateRenderer;
