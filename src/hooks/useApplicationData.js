import React, {useState, useEffect, useReducer } from "react";
import axios from "axios";

const DAYS = "DAYS";
const REGISTRATION = "REGISTRATION";
const INTERVIEW = "INTERVIEW";
function reducer(state, action) {
  switch(action.type) {
    case DAYS:
      return {...state, day: action.day};
    case REGISTRATION:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
      case INTERVIEW: {
        const days = state.days.map(day => {
          let spotsAvailable = day.spots;
          const nameCheck = day.name === state.day;
          const noInterview = state.appointments[action.id].interview;
          if (nameCheck && action.interview === null) {
            spotsAvailable++;
              return {...day, spots: spotsAvailable};
          } else if (nameCheck && !noInterview) {
            spotsAvailable--;
              return {...day, spots: spotsAvailable};
          }
          return day;
        })
        const appointments = {...state.appointments};
        appointments[action.id].interview = action.interview;
        return {...state, appointments, days};
      }
      default:
        throw new Error (
          "Not allowed to perform this action!"
        )
  }
}

export default function useApplicationData(props) {
  const [state, setState] = useReducer(reducer,{
    day: "Monday",
    days: [],
    appointments: {},
  });
  //co dailyAppointments = [];
  const setDay = (day) => {
    setState({type: DAYS, day});
  };
  //const setDays = (days) => setState((prev) => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {  
      
      //setState((prev) => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      
      setState(({
        type: REGISTRATION,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, []);
  function bookInterview(id, interview) {
    return new Promise((resolve, reject) => {
      if (!interview.interviewer || interview.student === "") {
        return reject();
      }
      const appointment = {
            ...state.appointments[id],
            interview: {...interview}
          }
      const requestUrl = `http://localhost:8001/api/appointments/`+id;
      return axios.put(
        requestUrl, appointment
        )
        .then(response => {
          dispatchEvent({
            type: INTERVIEW,
            id, 
            interview
          })
          resolve(response)
        })
        .catch(err => {
          reject(err);
        })
    })
  }
    function cancelInterview(id) {
      const appointment = {
        ...state.appointments[id],
        interview: null
      }
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      const requestUrl = `http://localhost:8001/api/appointments/`+id;
      return (
        axios.delete(requestUrl)
        .then(() => {
          setState({type: INTERVIEW, id, interview: null});
        })
      )
    }
    return {
      state,
      setDay,
      bookInterview,
      cancelInterview,
    }
}
