import React from "react";
/**
 * Function renders the empty component in the scheduling section.
 * @param {} props 
 * @returns 
 */
export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}
