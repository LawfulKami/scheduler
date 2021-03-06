import classnames from 'classnames';
import React from "react";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const buttonClass = classnames("interviewers__item", {
    "interviewers__item--selected" : props.selected
  });


  return (
<li className={buttonClass} onClick={() => props.onChange(props.value)}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
  );
}


