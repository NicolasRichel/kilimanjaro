import React from 'react';

// Styles
import './AmountRenderer.scss';

function AmountRenderer(props) {
  const amount = props.amount;
  return (
    <span className={`AmountRenderer ${amount < 0 ? 'negative' : 'positive'}`}>
      {(amount > 0 ? '+' : '') + amount}
    </span> 
  );
}

export default AmountRenderer;
