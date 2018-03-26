import React from 'react';
import style from './SelectDataPdfPageComponent.module.css';

const SelectDataPdfPageComponent = (props) => {
	if(!props.viewport || !props.items){
		return null;
	}
  return (
    <div className={style.PdfPageContainer} style={{width: props.viewport.width + 'px', height: props.viewport.height + 'px'}}>
      {props.items.map((item, idx)=>{ return(<span key={idx} className={style.PdfTextItem} style={item.style}>{item.str}</span>);})}
    </div>
  );
};

export default SelectDataPdfPageComponent;