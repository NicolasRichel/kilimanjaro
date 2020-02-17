import React from 'react';

// Styles
import './OperationRefCell.scss';


function OperationRefCell(props) {
  const reference = props.operation.reference;
  return <span className="OperationRefCell">{reference}</span>;
}


export default OperationRefCell;
