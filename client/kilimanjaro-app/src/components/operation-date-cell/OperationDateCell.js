import React from 'react';

// Styles
import './OperationDateCell.scss';


function OperationDateCell(props) {
  const date = props.operation.date;
  return <span className="OperationDateCell">{date}</span>;
}


export default OperationDateCell;
