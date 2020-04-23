import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";

class Logout extends Component {

  componentDidMount() {
    this.props.onlogout();
  }

  render() {
    return(
        <Redirect to="/" />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onlogout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);
