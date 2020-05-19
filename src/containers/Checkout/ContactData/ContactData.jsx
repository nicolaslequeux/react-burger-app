import React, { useState } from "react";
import axios from "../../../axios-orders";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updatedObject, checkValidity } from "../../../shared/utility";

const ContactData = props => {

  const [ orderForm, setOrderForm ] = useState(
    {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
      },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: "Fastest"},
            {value: 'cheapest', displayValue: "Cheapest"},
          ]
        },
        value: 'fastest',
        validation: {}, // Empty object pour ne pas avoir undefined dans les conditions
        valid: true
      }
    });

  const [ formIsValid, setFormIsValid ] = useState(false);


  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId
    }
    props.onOrderBurger(order, props.token);
  }


  const inputChangedHandler = (event, inputIdentifier) => {
    // JE DOIS ENTRER PLUS PROFOND DANS L'OBJET CAR LES SOUS-NIVEAU NE SONT PAS CLONES, MAIS GARDENT LEUR REFERENCE D'ORIGINE!
      // const updatedOrderForm = {
      //   ...this.state.orderForm
      // };
    // const updatedFormElement = {
    //   ...updatedOrderForm[inputIdentifier]
    // };
    // updatedFormElement.value = event.target.value;
    // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    // updatedFormElement.touched = true;
    // updatedOrderForm[inputIdentifier] = updatedFormElement;

    // JE PEUX AUSSI UTILISER UN HELPER
    const updatedFormElement = updatedObject(orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
        touched: true
      });
      const updatedOrderForm = updatedObject(orderForm, {
        [inputIdentifier]: updatedFormElement
      });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);

  }

    // JE DOIS TRANSFORMER L'OBJET JS EN ARRAY POUR LOOPER DESSUS
    const formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({
        id: key,
        config: orderForm[key]
      });
    }

    let form = (
      <form onSubmit={orderHandler} >
        {
          formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) => inputChangedHandler(event, formElement.id)}
            />
          ))
        }
        <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
      </form>
    );

    if (props.loading) {
      form = <Spinner />
    }

    return(
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
          {form}
      </div>
    );

}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice.toFixed(2),
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDisatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))

  }
}

export default connect(mapStateToProps, mapDisatchToProps)(withErrorHandler(ContactData, axios));
