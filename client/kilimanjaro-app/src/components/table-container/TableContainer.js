import React from 'react';
import OperationForm from '../operation-form/OperationForm';
import OperationTable from '../operation-table/OperationTable';

// Styles
import './TableContainer.scss';


function TableContainer() {
  return (
    <div className="TableContainer">
      <OperationForm />
      <OperationTable />
    </div>
  );
}


export default TableContainer;
