import React from 'react';

// Components
import IconButton from '../icon-button/IconButton';

// Styles
import './OperationActionsRenderer.scss';


function OperationActionsRenderer(props) {
  return (
    <span className="OperationActionsRenderer">
      <IconButton icon="pen-square"
        onClick={() => props.onUpdateClick( props.operation )} />
      <IconButton icon="trash"
        onClick={() => props.onDeleteClick( props.operation )} />
    </span>
  );
}


export default OperationActionsRenderer;
