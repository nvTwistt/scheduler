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
/**
 * Function deals with all the appointments and what is shown on screen
 * The function utilizes the useVisualMode object to help render the appropriate contents
 * on the scren.
 * @param {*} props 
 * @returns 
 */
export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id,interview)
    .then(() => transition(SHOW))
    .catch(() => {
      transition(ERROR_SAVE, true);
    });
  }
  function confirmation() {
    transition(CONFIRM);
  }
  function edit() {
    transition(EDIT);
  }
  function cancel() {
    transition(DELETE, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((error) => {
      transition(ERROR_DELETE, true);
    })
  }
  return (
    <section className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview !== null&&(
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmation}
          onEdit={edit}
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
      {
        mode === DELETE && (
          <Status
          message="deleting data"
          />
        )
      }
      {
        mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete your appointment?"
            onCancel={back}
            onConfirm={cancel}
          />
        )
      }
      {
        mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        )
      }
      {
        mode === ERROR_SAVE && (
          <Error
            message="Unable to save appointment."
            onClose={back}
          />
        )
      }
      {
        mode === ERROR_DELETE && (
          <Error
            message="Unable to delete appointment."
            onClose={back}
          />
        )
      }
    </section>
  );
}
