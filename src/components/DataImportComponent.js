import React from 'react';

import DropTarget from './DropTargetComponent.js';
import TextareaTarget from './TextareaTargetComponent.js';
import Loading from './LoadingComponent.js';
import style from './DataImportComponent.module.css';

const DataImportComponent = (props) => {
  const loadingComponent = props.isProccessing?<Loading inline={true} size="2x" />:null;
  let dataInfo = null;
  if(props.pdfPages.length > 0){
    dataInfo = (<p>Extracted {props.pdfPages.length} pdf pages.</p>);
  }
  return (
    <div className={style.DataImportComponent}>
      <div className={style.DataImportContainer}>
        <DropTarget onDrop={props.onDrop} isProccessing={props.isProccessing} />
        <div><span className={style.DataImportDividerText}>OR</span></div>
        <TextareaTarget onSubmit={props.onSubmit} isProccessing={props.isProccessing} />
      </div>
      {dataInfo}
      {loadingComponent}
    </div>
  );
};

export default DataImportComponent;