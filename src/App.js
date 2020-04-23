import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from "../src/hoc/asyncComponent/asyncComponent"; // Lazzy loading



import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

// LAZZY LOADING
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
      <Switch>
        {/* <Route path="/auth" component={Auth}></Route> */}
        <Route path="/auth" component={asyncAuth}></Route>

        <Route path="/" exact component={BurgerBuilder}></Route>
        {/* Redirect pour routes qui n'existent pas */}
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          {/* <Route path="/checkout" component={Checkout}></Route> */}
          <Route path="/checkout" component={asyncCheckout}></Route> 
          
          {/* <Route path="/orders" component={Orders}></Route> */}
          <Route path="/orders" component={asyncOrders}></Route>

          <Route path="/logout" component={Logout}></Route>
          {/* <Route path="/auth" component={Auth}></Route>            */}
          <Route path="/auth" component={asyncAuth}></Route>           

          <Route path="/" exact component={BurgerBuilder}></Route>
          {/* Redirect pour routes qui n'existent pas */}
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
          <Layout>
            { routes }
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = state  => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
