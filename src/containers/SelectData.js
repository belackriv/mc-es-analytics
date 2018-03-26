import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showPdfPage, showPreviousPdfPage, showNextPdfPage } from '../actions/actions.js'

import SelectDataComponent from '../components/SelectDataComponent.js';

class SelectData extends Component {
  componentWillMount(){
    this.displayFirstPageIfNoPageSet();
  }
  componentWillReceiveProps(nextProps){
    this.displayFirstPageIfNoPageSet();
  }
  displayFirstPageIfNoPageSet(){
    const { dispatch, page, pages } = this.props;
    if(pages.length > 0 && page === null){
      dispatch(showPdfPage(0));
    }
  }
  render(){
    return (<SelectDataComponent {...this.props} />);
  }
}

const mapStateToProps =  (state, ownProps) => {
  let page = null;
  if(state.pdf.currentPage !== null && state.pdf.pages.length > state.pdf.currentPage){
    page = state.pdf.pages[state.pdf.currentPage];
  }
  return {
    currentPage: state.pdf.currentPage,
    pages: state.pdf.pages,
    page: page
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    showPage: (pageNum) => {
      dispatch(showPdfPage(pageNum));
    },
    showPreviousPage: () => {
      dispatch(showPreviousPdfPage());
    },
    showNextPage: () => {
      dispatch(showNextPdfPage());
    }
  }
}
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectData);
 