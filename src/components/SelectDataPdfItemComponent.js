import React from 'react';
import style from './SelectDataPdfPageComponent.module.css';

const SelectDataPdfItemComponent = (props) => {
  return (
    <span className={props.selected?style.PdfTextItemSelected:style.PdfTextItem} style={props.style}>{props.str}</span>
  );
};

export default SelectDataPdfItemComponent;