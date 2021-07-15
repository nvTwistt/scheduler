import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";
/**
 * Function displays the interviewers in a list. 
 * Retuns an html component that is interactive and the interviewers can be clicked.
 * @param {} props 
 * @returns 
 */
export default function InterviewerListItem(props) {
  const InterviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  return (
    <li className={InterviewerClass} onClick={props.onChange} id={props.id}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : ""}
    </li>
  );
}
