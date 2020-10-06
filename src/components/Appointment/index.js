import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import { useVisualMode } from "../../hooks/useVisualMode";
import Confirm from "./Confirm";
import Error from "./Error";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDITING = "EDITING";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE"




export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  transition("SAVING")
  props.bookInterview(props.id, interview)
    .then(() => transition("SHOW", true))
    .catch(() => transition("ERROR_SAVE", true))
}

function remove(id) {
  transition("DELETING")
  props.deleteInterview(props.id)
    .then(() => transition("EMPTY", true))
    .catch(() => transition("ERROR_DELETE", true))
}

function initiateDel(){
  transition("CONFIRM")
}

function edit() {
  transition("EDITING")
}



return (
<article className="appointment"  data-testid="appointment">
  <Header time={props.time} />
  {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
  {mode === SHOW && (
  <Show
    id={props.id}
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    initiateDel={initiateDel}
    edit={edit}
  />
  )}
  {mode === CREATE && (
  <Form 
    onSave={save} 
    bookInterview={props.bookInterview} 
    interviewers={props.interviewers} 
    back={back}
    remove={remove}
  />
  )}
    {mode === EDITING && (
  <Form 
    name={props.interview.student}
    interviewer={props.interview.interviewer.id}
    onSave={save} 
    bookInterview={props.bookInterview} 
    interviewers={props.interviewers} 
    back={back}
    remove={remove}
  />
  )}
  
  {mode === SAVING && <Status message="Saving" />}
  {mode === ERROR_SAVE && <Error back={back} message="Something went wrong with the save" />}
  {mode === DELETING && <Status message="Deleting" />}
  {mode === ERROR_DELETE && <Error back={back} message="Something went wrong with the delete" />}
  {mode === CONFIRM && <Confirm id={props.id} back={back} remove={remove} message="Are you sure you want to delete?" />}
  
</article>
)}