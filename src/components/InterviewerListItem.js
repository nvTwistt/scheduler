import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";
export default function InterviewerListItem (props){
// const InterviewerListItem = ({selected, name, avatar, onChange})=> {
  const InterviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  return (
    <li className={InterviewerClass} onClick={props.onChange} id={props.id}>
      <img className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
      />
      {props.selected ? props.name:""}
    </li>
  );
}
//export default InterviewerListItem;

