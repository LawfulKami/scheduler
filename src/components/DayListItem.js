import classnames from 'classnames';
import React from "react";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const buttonClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining";
    }
    if (spots === 1) {
      return "1 spot remaining"
    }
    if (spots > 1) {
      return `${spots} spots remaining`
    }
  }

  return (
    <li data-testid="day" className={buttonClass} onClick={() => {props.setDay(props.name)}}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}