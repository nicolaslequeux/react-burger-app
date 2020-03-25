import React from "react";

import classes from "./Burger.module.css"
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";

const burger = (props) => {

  // Je reçois un objet que je dois transformer en Array pour utiliser .map()
  const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    console.log("igKey: " + igKey);
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      console.log("i: " + i);
      return <BurgerIngredient key={igKey + i} type={igKey} />
    });
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      { transformedIngredients }
      <BurgerIngredient type="bread-bottom" />
    </div>
  );

}

export default burger;
