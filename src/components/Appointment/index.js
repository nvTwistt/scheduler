import React, { useEffect, useState } from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";
import InterviewerListItem from "components/InterviewerListItem";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const BACK = "BACK";
  const SAVING = "SAVING";
  const confirm = "CONFIRM";
  const status = "STATUS";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    console.log("saved");
    console.log("name: ", name);
    console.log("interviewer: ", interviewer);
    const interview = {
      student: name,
      interviewer
    };
    console.log("This is the interview: ",interview)
    transition(SAVING);
    props.bookInterview(props.id,interview)
    .then(() => transition(SHOW));
  }
  
  // useEffect(() => {
  //   if (
  //     mode === EMPTY &&
  //     props.interview &&
  //     props.interview.student !== undefined
  //   ) {
  //     transition(SHOW);
  //   } else if (
  //     mode === SHOW &&
  //     props.interview &&
  //     props.interview.student === undefined
  //   ) {
  //     transition(EMPTY);
  //   }
  // }, [props.interview, mode, transition]);
  return (
    <section className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview !== null&&(
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          />
      )}
      {
        mode === SAVING && (
          <Status
          message="Saving data"
          />
        )
      }
    </section>
  );
}
