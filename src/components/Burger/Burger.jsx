import React from "react";

import classes from "./Burger.module.css"
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";

const burger = (props) => {

  // Je reçois un objet que je dois transformer en Array pour utiliser .map()
  // I flatten the array with reduce() pour pouvoir compter les elements... (lecon 130)
  let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />
    });
  })
  .reduce((arr, el) => { return arr.concat(el) }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  } 

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      { transformedIngredients }
      <BurgerIngredient type="bread-bottom" />
    </div>
  );

}

export default burger;
