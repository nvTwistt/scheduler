import React from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";
import InterviewerListItem from "components/InterviewerListItem";
export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const form = "FORM";
  const confirm = "CONFIRM";
  const status = "STATUS";
  return(
    <section className="appointment">
      <Header time={props.time}/>
      {props.interview ? (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
      ):(
      <Empty
      />
      )}
    </section>
  );
} 