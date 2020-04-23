import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.4,
  bacon: 0.7
};

const addIngredient = (state, action) => {
  const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    building: true,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  }
  return updatedObject(state, updatedState);
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
  
    case actionTypes.ADD_INGREDIENT:
      // v1 : SANS UTILITY FUNCTION
      // return {
      //   // I create a deep clown of the state object
      //   ...state,
      //   ingredients: {
      //     ...state.ingredients,
      //     [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      //   },
      //   totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      // };
      // v2: AVEC UTILITY FUNCTION :
      // const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
      // const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
      // const updatedState = {
      //   ingredients: updatedIngredients,
      //   totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      // }
      // return updatedObject(state, updatedState);
      // v3:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          building: true,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        // firebase les retourne classés alphabétiquement
        // ingredients: action.ingredients,
        // ORDRE FORCE avec NOM+QUANTITE CODEE EN DUR!
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        building: false
      }

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      // sans utility
      // return {
      //   ...state,
      //   error: true
      // }
      // avec :
      return updatedObject(state, {error: true});
  
    default:
      return state;
  
  }
}

export default reducer;
