import React from 'react';
import style from './SelectDataComponent.module.css';

import SelectDataPdfPagination from './SelectDataPdfPaginationComponent.js';
import SelectDataPdfPage from '../containers/SelectDataPdfPage.js';

const SelectDataComponent = (props) => {
  let paginationComponent = null;
  let pageComponent = null;
  if(props.page !== null){
    paginationComponent = (<SelectDataPdfPagination {...props}  />);
    pageComponent = (<SelectDataPdfPage page={props.page} />);
  }
  return (
    <div>
      {paginationComponent}
      {pageComponent}
    </div>
  );
};

export default SelectDataComponent;