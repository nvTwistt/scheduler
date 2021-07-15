import React from "react";
import classNames from "classnames";
import "components/Button.scss";
/**
 * Function is a button that takes the button class and gives it styling and action. 
 * The button will confirm or delete an appointment and allows the user to interact with the button.
 * @param {} props 
 * @returns An html button that contains the class name and can be clicked.
 */
export default function Button(props) {
   const buttonClass = classNames("button", {
     "button--confirm": props.confirm,
     "button--danger": props.danger
   });
 
   return (
     <button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
 }
