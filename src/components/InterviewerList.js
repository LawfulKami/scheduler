import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

const items = props.interviewers.map((interviewer) => {
  const { name, avatar, id } = interviewer
  return <InterviewerListItem 
  key={id}
  value={id}
  name={name}
  avatar={avatar}
  selected= {props.value === interviewer.id}
  onChange={props.onChange}
  />
})


  return (
<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
<ul className="interviewers__list">{items}</ul>
</section>
  );
}




