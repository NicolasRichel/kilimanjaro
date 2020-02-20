import React from 'react';

// Styles
import './OperationAmountCell.scss';


function OperationAmountCell(props) {
  const amount = props.operation.amount;
  return (
    <span className={`OperationAmountCell ${amount < 0 ? 'negative' : 'positive'}`}>
      {(amount > 0 ? '+' : '') + amount}
    </span> 
  );
}


export default OperationAmountCell;
