import React, { Component } from 'react';
import { connect } from 'react-redux';
import { processPdfPageTextContent, selectPdfItems } from '../actions/actions.js';
import SelectDataPdfPageComponent from '../components/SelectDataPdfPageComponent.js';

 class SelectDataPdfPage extends Component {
  componentWillMount(){
    this.processItemsForPage();
  }
  componentWillReceiveProps(nextProps){
    if(this.props.page !== nextProps.page){
      this.processItemsForPage();
    }
  }
  processItemsForPage(){
    const { dispatch, page } = this.props;
    if(page){
      dispatch(processPdfPageTextContent(page));
    }
  }
  render(){
    return (<SelectDataPdfPageComponent {...this.props} />);
  }
}

const mapStateToProps =  (state, ownProps) => {
  return {
    items: state.pdf.pageItems,
    viewport: state.pdf.viewport,
    selectedKeys: state.ui.selectedItemKeys,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    handleSelection:  (itemKeys) => {
      dispatch(selectPdfItems(itemKeys));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDataPdfPage);
 

