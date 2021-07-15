import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
/**
 * Function renders the form component on the app. This function gets all the contents from the 
 * form and ensures they are correct when submitted, then the states will change and the data will be saved.
 * @param {*} props 
 * @returns 
 */
export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [value, onChange] = useState(props.value || null);
  const [error, setError] = useState("");
  function reset() {
    setName("");
    setError("");
    onChange(null);
    props.onCancel();
  }
  function validate() {
    
    if (name === "" ) {
      setError("Student name cannot be blank");
      return;
    }
    if (value === null || value === undefined) {
      setError("Must select interviewer");
      return;
    }
    setError("");
    props.onSave(name, value);
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={value}
          onChange={onChange}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
