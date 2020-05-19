import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandling from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import  * as actions from "../../store/actions/index";


const BurgerBuilder = props => {

  const [purchasing, setPurchasing] = useState(false);
    
  const dispatch = useDispatch();
  
  // mapStateToProps equivalent with useSelector hook
  const ings = useSelector(state => state.burgerBuilder.ingredients);
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  
  // mapDispatchToProps with useDispatch hook
  const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));

  // I don't want this function to run on each rebuild as trigegr the useEffect, then infinite loop. useCallBack take external dependencies to know when to update
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    [dispatch]
  );
  
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => { return ingredients[igKey];
      })
      .reduce((sum,el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout'); // Coming from the Router
  }
    
  const disabledInfo = {
    ...ings
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let orderSummary = null;
  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (ings) {
    burger = (
      <>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchaseable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          price={price}
          isAuth={isAuthenticated}
        />
      </>
    );
    orderSummary = <OrderSummary
      ingredients={ings}
      price={price.toFixed(2)}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinue={purchaseContinueHandler}
    />;
  }

  return(
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );

}

// const mapStateToProps = state => {
//   return {
//     // ings: state.burgerBuilder.ingredients,
//     // price: state.burgerBuilder.totalPrice,
//     // error: state.burgerBuilder.error,
//     // isAuthenticated: state.auth.token !== null
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     // onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//     // onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//     // onInitIngredients: () => dispatch(actions.initIngredients()),
//     // onInitPurchase: () => dispatch(actions.purchaseInit()),
//     // onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(BurgerBuilder, axios));

export default withErrorHandling(BurgerBuilder, axios);