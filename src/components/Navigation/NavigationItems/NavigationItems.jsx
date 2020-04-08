import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>

    {/* Pour boolean props, c'est pareil: active vs active={true} */}
    
    {/* Je passe la property 'exact' que je crée pour NavigationItem (ne pas confondre avec le exact de Route!!) */}
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    <NavigationItem link="/orders" >Orders</NavigationItem>
  </ul>
);

export default navigationItems;
