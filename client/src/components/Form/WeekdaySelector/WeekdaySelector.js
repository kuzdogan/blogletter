import PropTypes from "prop-types";
import React from "react";
import "./WeekdaySelector.scss";

const WeekdayButton = ({day, active, onClick}) => {
  console.log("rerendering: ", active);
  return (
    <div className={`weekday-button ${active ? "active" :""}`} onClick={onClick}>
      {day}
    </div>
  );
};
WeekdayButton.propTypes = {
  day: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  toggleActiveDay: PropTypes.func.isRequired,
  isActiveDays: PropTypes.array.isRequired
};

export default function WeekdaySelector({ isActiveDays, toggleActiveDay }) {
  const weekdays = ["M", "Tu", "W", "Th", "Fr", "Sa", "Su"];

  let WeekdayButtons = weekdays.map((day, i) => {
    return <WeekdayButton day={day} key={i} active={isActiveDays[i]} onClick={() => toggleActiveDay(i)}/>;
  });

  return (
    <div className="weekday-selector-wrapper">
      {
        WeekdayButtons
      }
    </div>
  );
}