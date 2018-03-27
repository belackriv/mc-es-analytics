import UUID from 'uuidjs';

export const ASYNC_PROCESS_STARTED = 'ASYNC_PROCESS_STARTED';
export const asyncProcessStarted = () => ({
   type: ASYNC_PROCESS_STARTED
});

export const ASYNC_PROCESS_ENDED = 'ASYNC_PROCESS_ENDED';
export const asyncProcessEnded = () => ({
   type: ASYNC_PROCESS_ENDED
});

export const SHOW_PDF_PAGE = 'SHOW_PDF_PAGE';
export const showPdfPage = (pageNum) => ({
   type: SHOW_PDF_PAGE,
   pageNum: pageNum
});

export const SHOW_PREVIOUS_PDF_PAGE = 'SHOW_PREVIOUS_PDF_PAGE';
export const showPreviousPdfPage = () => ({
   type: SHOW_PREVIOUS_PDF_PAGE
});
 
export const SHOW_NEXT_PDF_PAGE = 'SHOW_NEXT_PDF_PAGE';
export const showNextPdfPage = () => ({
   type: SHOW_NEXT_PDF_PAGE
});

export const ADD_PDF_PAGE = 'ADD_PDF_PAGE';
export const addPdfPage = (page) => ({
  type: ADD_PDF_PAGE,
  page: page
});

const	loadPdf = (arrayBuffer) => {
	return (dispatch) => {
		dispatch(asyncProcessStarted());
	  let loadingTask = window.pdfjsLib.getDocument(arrayBuffer);
	  loadingTask.promise.then(pdf => {
	    for(let i = 1; i <= pdf.numPages; i++) {
	      pdf.getPage(i).then((page) => {
	        dispatch(addPdfPage(page));
	        dispatch(asyncProcessEnded());
	      });
	    }
	  });
	}
}

 export const onFileDrop = (acceptedFiles) => {
 	return (dispatch) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(loadPdf(reader.result));
        dispatch(asyncProcessEnded());
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      dispatch(asyncProcessStarted());
      reader.readAsArrayBuffer(file);
    });
  };
 };

export const SET_PDF_VIEWPORT = 'SET_PDF_VIEWPORT';
export const setPdfViewport = (viewport) => ({
   type: SET_PDF_VIEWPORT,
   viewport: viewport
});

export const ADD_PDF_PAGE_ITEMS = 'ADD_PDF_PAGE_ITEMS';
export const processPdfPageTextContent = (page) => {
	return (dispatch) => {
		dispatch(asyncProcessStarted());
		const viewport = page.getViewport(1.5);
		dispatch(setPdfViewport(viewport));
		dispatch({
      type: ADD_PDF_PAGE_ITEMS,
      items: []
    });
    page.getTextContent({ normalizeWhitespace: true }).then(textContent => {
      const ctx = document.createElement('canvas').getContext('2d', { alpha: false });
      const items = [];
      textContent.items.forEach(textItem => {
        let tx = window.pdfjsLib.Util.transform(
          window.pdfjsLib.Util.transform(viewport.transform, textItem.transform),
          [1, 0, 0, -1, 0, 0]
        );
        let style = textContent.styles[textItem.fontName];

        // adjust for font ascent/descent
        var fontSize = Math.sqrt((tx[2] * tx[2]) + (tx[3] * tx[3]));
        if (style.ascent) {
          tx[5] -= fontSize * style.ascent;
        } else if (style.descent) {
          tx[5] -= fontSize * (1 + style.descent);
        } else {
          tx[5] -= fontSize / 2;
        }

        // adjust for rendered width
        if (textItem.width > 0) {
          ctx.font = tx[0] + 'px ' + style.fontFamily;

          var width = ctx.measureText(textItem.str).width;
          if (width > 0) {
            tx[0] = (textItem.width * viewport.scale) / width;
          }
        }

        items.push({
          id: UUID.generate(),
        	viewport: viewport,
          str: textItem.str,
          style : {
            fontFamily: style.fontFamily,
            fontSize: fontSize + 'px',
            transform:  'scaleX(' + tx[0] + ')',
            left: tx[4] + 'px',
            top:tx[5] + 'px'
          }
        })
      });
      ctx.canvas.remove();
      dispatch({
        type: ADD_PDF_PAGE_ITEMS,
        items: items
      });
      dispatch(asyncProcessEnded());
    });
  };
};

export const SELECT_PDF_ITEMS = 'SELECT_PDF_ITEMS';
export const SET_TEXTAREA_VALUE = 'SET_TEXTAREA_VALUE';
export const selectPdfItems = (selectedItemKeys) => {
  return (dispatch, getState)=>{
    dispatch({
      type: SELECT_PDF_ITEMS,
      selectedItemKeys: selectedItemKeys
    });
    const currentState = getState();
    const separator = currentState.ui.textareaValueSeparator==='tab'?'\t':'\n';
    let textareaValue = selectedItemKeys.map((itemKey)=>{
      return currentState.pdf.pageItems.find((elem)=>{ return (elem.id === itemKey)}).str;
    }).join(separator);
    dispatch({
      type: SET_TEXTAREA_VALUE,
      textareaValue: textareaValue
    });
  };
};



export const SEPARATOR_CHANGED = 'SEPARATOR_CHANGED';
export const separatorChanged = (separator) => ({
  type: SEPARATOR_CHANGED,
  value: separator
});