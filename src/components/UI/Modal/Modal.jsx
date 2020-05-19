import React from "react";

import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => {
  
  return(
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed}/>
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        {props.children}
      </div>
    </Aux>
  );

}

// React.memo optimizes perfomance as re-render si changement dans la function 2nd argument qui est une fonction de comparaison qui retourne true/false whatever props are equals or not)
export default React.memo(Modal, (prevProps, nextProps) =>
  nextProps.show === prevProps.show && nextProps.children === prevProps.children
);
