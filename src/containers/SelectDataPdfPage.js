import React, { Component } from 'react';
import { connect } from 'react-redux';
import { processPdfPageTextContent } from '../actions/actions.js';
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
    viewport: state.pdf.viewport
  }
};

export default connect(
  mapStateToProps
)(SelectDataPdfPage);
 

