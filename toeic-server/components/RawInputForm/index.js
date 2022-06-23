import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Label, Select, Button, Textarea} from '@buffetjs/core'
import Row from "../Row";

class RawInputForm extends Component {
  dataFormats = [{label: 'csv', value: 'text/csv'}];
  state = {
    rawText: '',
    dataFormat: 'text/csv'
  }
  textChanged = async rawText => {
    this.setState({rawText});
  };
  changeDataFormat = dataFormat => {
    this.setState({dataFormat});
  };
  analyze = () => {
    const { dataFormat, rawText } = this.state;
    this.props.onRequestAnalysis({
      source: "raw",
      type: this.state.dataFormat,
      options: { rawText }
    });
  };
};

RawInputForm.propTypes = {
  onRequestAnalysis: PropTypes.func.isRequired,
  loadingAnalysis: PropTypes.bool.isRequired
}
export default RawInputForm