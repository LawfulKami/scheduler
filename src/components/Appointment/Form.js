import React, { useState } from "react";
import Button from "../Button"
import InterviewerList from "../InterviewerList"



export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");


  function reset() {
    setName("")
    setInterviewer(null)
  }

  function cancel() {
    reset()
    props.back()
  }

  function validate(name, interviewer) {
    if (name === "" || !interviewer) {
      setError("Student name or Interviewer cannot be blank");
      return;

    }
  
    props.onSave(name, interviewer);
  }
  

  return <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            setError("")
          }}
          data-testid="student-name-input"
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button onClick={cancel} danger>Cancel</Button>
        <Button onClick={() => validate(name, interviewer)} confirm>Save</Button>
      </section>
    </section>
  </main>
}