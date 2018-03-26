import React from 'react';
import Dropzone from 'react-dropzone';
import DropzoneDefaultStyles from 'react-dropzone/src/utils/styles';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faDownload from '@fortawesome/fontawesome-free-solid/faDownload';

import Loading from './LoadingComponent.js';
import style from './DropTargetComponent.module.css';

const DropTargetComponent  = (props) => {
  const loadingComponent = props.isProcessing?<Loading inline={true} size="2x" />:null;
  let contentComponent = (
    <div>
      <FontAwesomeIcon icon={faDownload} size="5x" />
      <div style={{paddingLeft: '1em'}}>
        <p>
          Drop files here, or click to select files to process.
        </p>
      </div>
    </div>
  );
  if(loadingComponent){
    contentComponent = loadingComponent;
  }
  let dropzoneStyles = Object.assign({}, DropzoneDefaultStyles);
  dropzoneStyles.default.width = '100%';
  dropzoneStyles.default.textAlign = 'center';
  return (
    <div className={style.DropTargetContainer}>
      <Dropzone onDrop={props.onDrop}
        accept="application/pdf"
        style={dropzoneStyles.default}
        activeStyle={dropzoneStyles.active}
        rejectStyle={dropzoneStyles.rejected}
        disabledStyle={dropzoneStyles.disabled}
      >
        {contentComponent}
      </Dropzone>
    </div>
  );
};

export default DropTargetComponent;