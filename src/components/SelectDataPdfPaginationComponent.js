import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowAltSquareLeft from '@fortawesome/fontawesome-pro-solid/faArrowAltSquareLeft';
import faArrowAltSquareRight from '@fortawesome/fontawesome-pro-solid/faArrowAltSquareRight';
import Loading from './LoadingComponent.js';

const SelectDataPdfPaginationComponent = (props) => {
  const loadingComponent = props.isProcessing?<Loading inline={true} size="2x" />:null;
console.log(loadingComponent);
  const prevButtonDisabled = (props.currentPage > 0)?false:true;
  const nextButtonDisabled = (props.currentPage < (props.pages.length - 1))?false:true;
  return (
    <div>
      <button type="button" onClick={props.showPreviousPage} disabled={prevButtonDisabled}><FontAwesomeIcon icon={faArrowAltSquareLeft} /></button>
      <span>Showing page {props.currentPage + 1} of {props.pages.length}</span>
      <button type="button" onClick={props.showNextPage} disabled={nextButtonDisabled}><FontAwesomeIcon icon={faArrowAltSquareRight} /></button>
      {loadingComponent}
    </div>
  );
};

export default SelectDataPdfPaginationComponent;