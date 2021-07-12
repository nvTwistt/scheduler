import React, { useState, useEffect } from "react";
import useVisualMode from "hooks/useVisualMode";
import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "components/DayList";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helper/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state, setDay, bookInterview, cancelInterview
  } = useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    
    return ( 
      <Appointment
      key={appointment.id}
      id={appointment.id}
      interviewers={interviewers}
      time={appointment.time}
      interview={interview}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
      
    );
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className = "schedule">
        {/* {getAppointmentsForDay(state, state.day).map(a => {
                    return (
                        <Appointment
                            key={a.id}
                            {...a}
                            interview={getInterview(state, a.interview)}
                            // interviewers={getInterviewersForDay(state, state.day)}
                            // bookInterview={bookInterview}
                            // deleteInterview={deleteInterview}
                        />
                    );
                })} */}
                {schedule}
        <Appointment key="last" id="last" time="5pm" />
      </section>
    </main>
  );
}
