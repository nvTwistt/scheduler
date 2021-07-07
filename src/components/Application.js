import React , {useState, useEffect} from "react";
import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "components/DayList";
const axios = require(`axios`);

//const [days, setDays] = useState([]);
// useEffect(() => {
//   const URL = `http://localhost:8001/api/days`
// })
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Matt",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Duncan",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Jose",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
];
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

const getAppointments = function() {
  
  return appointments.map(i => {
    return (
      <Appointment
      key={i.id}
      interview={i.interview}
      id={i.id}
      time={i.time}
      />
    )
  })
}
//const [day, setDay] = useState("Monday");
export default function Application(props) {
  const [days, setDays] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8001/api/days")
    //const URL = `http://localhost:8001/api/days`
    .then((response) => {
      console.log("The response: ",response);
      console.log("The Data: ", response.data);
      console.log("The Data: ", typeof(response.data));
      setDays(response.data);
    })
  },[])
  
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
        <DayList days={days} day={"Monday"} setDay={day => console.log(day)}/>

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {getAppointments()}
        {console.log(days)}
        <Appointment key="last" id="last" time="5pm" />
      </section>
    </main>
  );
}
