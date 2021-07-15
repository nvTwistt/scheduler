import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";
/**
 * Function takes in props as an argument and will calculate the number of spots remaining.
 * @param {*} props 
 * @returns HTML rendering to calculate the number of spots available.
 */
export default function DayListItem(props) {
  const itemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  return (
    <div className={itemClass} onClick={props.setDay} data-testid="day">
      <h2><strong>{props.name}</strong></h2>
      <p>{props.spots === 0 ? "no" : props.spots} spot{props.spots !== 1 && "s"}{" "}
      remaining
      </p>
    </div>
  );
}