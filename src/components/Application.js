import React, { useState, useEffect } from "react";
import useVisualMode from "hooks/useVisualMode";
import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "components/DayList";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helper/selectors";
const axios = require(`axios`);

//const [days, setDays] = useState([]);
// useEffect(() => {
//   const URL = `http://localhost:8001/api/days`
// })
// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Matt",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Duncan",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Jose",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
// ];
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const getAppointments = function() {

//   return dailyAppointments.map(i => {
//     return (
//       <Appointment
//       key={i.id}
//       interview={i.interview}
//       id={i.id}
//       time={i.time}
//       />
//     )
//   })
// }

export default function Application(props) {
  //const [day, setDay] = useState("Monday");
  //const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });
  //co dailyAppointments = [];
  const setDay = (day) => {
    setState({ ...state, day });
    console.log(day);
  };
  //const setDays = (days) => setState((prev) => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {  
      setState((prev) => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
    // axios
    //   .get("http://localhost:8001/api/days")
    //   //const URL = `http://localhost:8001/api/days`
    //   .then((response) => {
    //     console.log("The response: ", response);
    //     console.log("The Data: ", response.data);
    //     console.log("The Data: ", typeof response.data);
    //     setDays(response.data);
    //   });
  }, []);
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    function bookInterview(id, interview) {
      console.log("nice: ",id);
      console.log("int: ", interview);
      const appointment = {
        ...state.appointments[id],
        interview: {...interview}
      }
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      const requestUrl = `http://localhost:8001/api/appointments/`+id;
      return (
        axios.put(requestUrl, {interview})
        .then(() => {
          setState({...state, appointments});
        })
        );
    }
    function cancelInterview(id, interview) {
      
    }
    
    return ( 
      <Appointment
      key={appointment.id}
      id={appointment.id}
      interviewers={interviewers}
      time={appointment.time}
      interview={interview}
      bookInterview={bookInterview}
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
