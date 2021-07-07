import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
export default function Form (props){
  const [name, setName] = useState(props.name || "");
  const [value, onChange] = useState(props.value || null);
  const [error, setError] = useState("");
  function reset() {
    setName("");
    setError("");
    onChange(null);
    props.onCancel();
  }
  function submit() {
    if(name === "") {
      setError("Cannot have student name as empty");
      return;
    }
    setError("");
    props.onSave(name, value);
  }
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
      onChange={event => 
        setName(event.target.value)
      }
        className="appointment__create-input text--semi-bold"
        name={name}
        value={name}
        type="text"
        placeholder="Enter Student Name"
        data-testid="student-name-input"
        /*
          This must be a controlled component
        */
       
      />
    </form>
    <InterviewerList 
    interviewers={props.interviewers} 
    value={value} 
    onChange={onChange} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={reset}>Cancel</Button>
      <Button confirm onClick={submit}>Save</Button>
    </section>
  </section>
</main>
  );
}