import React, { Component } from "react";
import PropTypes from "prop-types";
import Row from "../Row";
import { Label, InputText } from "@buffetjs/core";
import { LoadingIndicator } from "strapi-helper-plugin";

class ExternalUrlForm extends Component {
  state = { url: "" };
  preAnalyzeImportFile = async url => {
    this.setState({ url }, () => {
      this.props.onRequestAnalysis({ source: "url", options: { url } });
    });
  };
}
ExternalUrlForm.propTypes = {
  onRequestAnalysis: PropTypes.func.isRequired,
  loadingAnalysis: PropTypes.bool.isRequired
};

export default ExternalUrlForm;