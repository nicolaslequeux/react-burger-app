import React, {useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";

const Logout = (props) => {

  const { onlogout } = props;

  useEffect(() => {
    onlogout();
  }, [onlogout])

  return <Redirect to="/" />;
  
};

const mapDispatchToProps = dispatch => {
  return {
    onlogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
