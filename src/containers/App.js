import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../mclogo.png';
import style from './App.module.css';
import DataImport from '../components/DataImportComponent.js';
import SelectData from './SelectData.js';
import { onFileDrop } from '../actions/actions.js';

class App extends Component {
  /*
  onTextSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    this.processText(formData.get('textData'));
  }
  processText(str){
    const regex = RegExp('[0-9]{2}-[0-9]{7}-','g');
    let i = 0;
    let matches;
    while ((matches = regex.exec(str)) !== null && i < 10000) {
    console.log(`Found ${matches[0]}. Next starts at ${regex.lastIndex}.`);
      i++;
    }
  }
  */
  render() {
    return (
      <div className={style.App}>
        <header className={style.AppHeader}>
          <p className={style.AppLogoContainer}><img src={logo} className={style.AppLogo} alt="logo" /></p>
          <h1 className={style.AppTitle}>McLendon-Chisholm Emergency Services Analytics</h1>
        </header>
        <DataImport
          isProcessing={this.props.isProcessing}
          pdfPages={this.props.pdfPages}
          onDrop={this.props.onFileDrop}
          //onSubmit={this.props.onTextSubmit}
        />
        <SelectData
          isProcessing={this.props.isProcessing}
          pages={this.props.pdfPages}
          items={this.props.pdfItems}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  pdfPages: state.pdf.pages,
  pdfItems: state.pdf.items,
  isProcessing: state.ui.isProcessing,
})

const mapDispatchToProps  = (dispatch, ownProps) => ({
  onFileDrop: (files) => { dispatch(onFileDrop(files)); },
  //onTextSubmit: () => { dispatch(showUploadJobsForm()); },
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

