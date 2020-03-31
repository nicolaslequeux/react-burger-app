import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    {/* Pour boolean props, c'est pareil: active vs active={true} */}
    <NavigationItem link="/" active >Burger Builder</NavigationItem>
    <NavigationItem link="/" >Checkout</NavigationItem>
  </ul>
);

export default navigationItems;
