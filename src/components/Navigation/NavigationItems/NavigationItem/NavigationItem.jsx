import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={classes.active}
    >
      {props.children}
    </NavLink>

    {/* AVEC LE ROUTEUR EN AMONT JE PEUX UTILISER <Link> LIEU DE <a>, NO PAGE RE-RENDERING, ONLY DOM */}
    {/* <a
      href={props.link}
      className={props.active ? classes.active : null}
    >
      {props.children}
    </a> */}

  </li>
);

export default navigationItem;
