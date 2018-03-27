import React from 'react';

import Loading from './LoadingComponent.js';
import style from './TextareaTargetComponent.module.css';

const TextareaTargetComponent = (props) => {
  const loadingComponent = props.isSyncing?<Loading inline={true} size="2x" />:null;
  return (
    <div className={style.TextareaTargetContainer}>
      <form onSubmit={props.onSubmit}>
        <textarea name="textData" value={props.value} className={style.TextareaTargetInput} placeholder="Paste Text To Process">
        </textarea>
        <div>
          <label>
            Tab
            <input type="radio" name="separator" onChange={props.handleSeparatorChange} value="tab" checked={(props.separator==='tab')} />
          </label>
          <label>
            New Line
            <input type="radio" name="separator" onChange={props.handleSeparatorChange} value="newline" checked={(props.separator==='newline')} />
          </label>
          <button className="button small radius"
            disabled={props.isSyncing || props.isProcessing  || props.isSubmitted}
            type="submit"
          >
            Submit
          </button>
          {loadingComponent}
        </div>
      </form>
    </div>
  );
};

export default TextareaTargetComponent;