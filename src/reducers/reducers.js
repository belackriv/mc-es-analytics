import { combineReducers } from 'redux';
import * as ActionTypes from '../actions/actions.js';

const defaultPdfState = {
  currentPage: null,
  viewport: null,
  pages: [],
  pageItems: [],
};

const pdfReducer = (state = defaultPdfState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PDF_VIEWPORT:
      return {...state, viewport: action.viewport};
    case ActionTypes.SHOW_PDF_PAGE:
        return {...state, currentPage: action.pageNum};
    case ActionTypes.SHOW_PREVIOUS_PDF_PAGE:
      if(state.currentPage > 0){
        return {...state, currentPage: state.currentPage - 1};
      }else{
        return state;
      }
    case ActionTypes.SHOW_NEXT_PDF_PAGE:
      if(state.currentPage < (state.pages.length - 1)){
        return {...state, currentPage: state.currentPage + 1};
      }else{
        return state;
      }
    case ActionTypes.ADD_PDF_PAGE:
      return {...state, pages: [...state.pages, action.page] };
    case ActionTypes.ADD_PDF_PAGE_ITEMS:
      return {...state, pageItems: action.items};
    default:
      return state;
  }
};

const defaultUiState = {
  isProcessing: false,
  asyncProcesses: 0,
  selectedItemKeys: [],
  textareaValue: null,
  textareaValueSeparator: '\t',
};

const uiReducer = (state = defaultUiState, action) => {
  switch (action.type) {
    case ActionTypes.ASYNC_PROCESS_STARTED:
      return {...state, asyncProcesses: state.asyncProcesses + 1};
    case ActionTypes.ASYNC_PROCESS_ENDED:
      const isProcessing = (state.asyncProcesses > 1)?true:false;
      return {...state, asyncProcesses: state.asyncProcesses - 1, isProcessing: isProcessing};
    case ActionTypes.SELECT_PDF_ITEMS:
      return {...state, selectedItemKeys: Array.from(action.selectedItemKeys)};
    case ActionTypes.SET_TEXTAREA_VALUE:
      return {...state, textareaValue: action.textareaValue};
    case ActionTypes.SEPARATOR_CHANGED:
      return {...state, textareaValueSeparator: action.value};
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  pdf: pdfReducer,
  ui: uiReducer
})

export default rootReducer;