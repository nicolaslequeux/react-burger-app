import React from "react";

import classes from "./Logo.module.css";

// burgerLogo receives the path for wepack manage everything
import burgerLogo from "../../assets/images/burger-logo.png";

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} style={{height: props.height}} alt="burger-logo"></img>
  </div>
);

export default logo;
