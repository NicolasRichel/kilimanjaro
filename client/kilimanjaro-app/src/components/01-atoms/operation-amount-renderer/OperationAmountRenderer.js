import React from 'react';

// Styles
import './OperationAmountRenderer.scss';


function OperationAmountRenderer(props) {
  const amount = props.operation.amount;
  return (
    <span className={`OperationAmountRenderer ${amount < 0 ? 'negative' : 'positive'}`}>
      {(amount > 0 ? '+' : '') + amount}
    </span> 
  );
}


export default OperationAmountRenderer;
