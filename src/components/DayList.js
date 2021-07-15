import React from "react";
import DayListItem from "./DayListItem";
/**
 * Function takes in props as an argument and will map the days to the appointments to show
 * The number of appointments on that day and how many spots are available. 
 * @param {} props 
 * @returns HTML rendering of the days and the appointments available for the day.
 */
export default function DayList(props) {
  return (
    <ul>
      <li>
        {props.days.map(day => (
          <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={() => props.setDay(day.name)}
          />
        ))}
      </li>
    </ul>
  );
}
