import axios from "../../axios-orders";

import * as actionTypes from "./actionTypes";

// Naming convention : action creator in camel case as identifier in big letter with underscore
export const addIngredient = (name) => {
  // I return an action
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name // payload
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

// Synch actionCreators for thunk
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });



  };
}


