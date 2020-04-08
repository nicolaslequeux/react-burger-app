import React, { Component } from "react";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address:{
      street: '',
      postalcode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    // le composant form de html renvoie un post, nouvelle page que je ne veux pas
    event.preventDefault();
    // console.log(this.props);
    // console.log(this.props.ingredients);
    this.setState({loading: true}); //Pour utiliser le spinner?
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Nicolas",
        address: {
          street: "Test street",
          zipcode: "08800",
          country: "France",
        },
        email: "test@test.com"
      },
      deliveryMethod: 'fatest'
    }

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading: false});
      });

  }


  render() {

    let form = (
      <form>
          <input className={classes.Input} type="text" name="name" placeholder="Name" />
          <input className={classes.Input} type="email" name="email" placeholder="Email" />
          <input className={classes.Input} type="text" name="street" placeholder="Street" />
          <input className={classes.Input} type="text" name="postalcode" placeholder="Postal code" />
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
    );

    if (this.state.loading) {
      form = <Spinner />
    }

    return(
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
          {form}
      </div>
    );
  } 

}

export default ContactData;