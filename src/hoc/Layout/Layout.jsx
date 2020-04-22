import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../Aux/Aux";
import classes from "./Layout.module.css"
import Toolbar from "../../components/Navigation/ToolBar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    // NE PAS FAIRE COMME CECI CAR SETSTATE IS ASYNCHRONUS FUNCTION, DOES NOT RESTPECT THE FLOW, MIGHT BE LATE OR IN ADVANCE % NEXT STEP IN YOUR LOGIC !!
    // this.setState({showSideDrawer: !this.showSideDrawer});
    // INSTEAD:
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  }

  render () {
    return(
    <Aux>
      <Toolbar
        isAuth={this.props.isAuthenticated}
        drawerToggleClicked={this.sideDrawerToggleHandler}/>
      <SideDrawer
        isAuth={this.props.isAuthenticated}
        open={this.state.showSideDrawer}
        closed={this.sideDrawerClosedHandler}
      />
      <main className={classes.Content}>
        {this.props.children}
      </main>
    </Aux>
    )}
  
 };

 const mapStateToProps = (state) => {
   return {
     isAuthenticated: state.auth.token !== null
   }
 }

export default connect(mapStateToProps)(Layout);
