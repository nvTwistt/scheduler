import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";
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
    // <li onClick={() => props.setDay(props.name)}>
    //   <h2 className={itemClass}>{props.name}</h2>
    //   <h3 className={itemClass}>{props.spots}</h3>
    // </li>
  );
}