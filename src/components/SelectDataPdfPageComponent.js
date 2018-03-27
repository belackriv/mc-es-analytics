import React from 'react';
import style from './SelectDataPdfPageComponent.module.css';

import { SelectableGroup, createSelectable } from 'react-selectable';
import SelectDataPdfItemComponent from './SelectDataPdfItemComponent.js';

const SelectableComponent = createSelectable(SelectDataPdfItemComponent);

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

/*
<SelectableGroup className={style.SelectableGroup} onSelection={props.handleSelection}>
      	{props.items.map((item, idx)=>{
      		let selected = props.selectedKeys.indexOf(item.id) > -1;
      		return(<SelectableComponent selected={selected} key={idx} style={item.style} str={item.str} selectableKey={item.id}></SelectableComponent>);
      	})}
      </SelectableGroup>

*/