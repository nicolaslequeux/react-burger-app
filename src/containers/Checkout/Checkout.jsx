import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    // METHODE DISPONIBLE SUR LE URLSEARCHPARAMS OBJECT!!
    for (let param of query.entries()) {
      // ['salad', '1']
      // Tout ce qui vient de la query est string, je convertis '1' en value avec le '+' de +params[1]
      if (param[0] === 'price') {
        price = +param[1];
      } else {
        ingredients[param[0]] = param[1];
      }
    }
    this.setState({ingredients: ingredients, totalPrice: price})
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {

    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        
        {/* VERSION 1 (SANS DATA) */}
        {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData}/> */}
        
        {/* J'utilise the render property pour passer mes data@ */}
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props} //je passe mon objet props qui contient mon historique de navigation
              />
          )}
          />
        
      </div>
    )
  }

}

export default Checkout;
