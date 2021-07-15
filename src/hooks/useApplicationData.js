import { useEffect, useReducer } from "react";
import axios from "axios";

const DAYS = "DAYS";
const REGISTRATION = "REGISTRATION";
const INTERVIEW = "INTERVIEW";
function reducer(state, action) {
  switch(action.type) {
    case DAYS:
      let dayObj = {...state, day: action.day};
      return dayObj;
    case REGISTRATION:
      let regObj = {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
      return regObj;
      case INTERVIEW: {
        const days = state.days.map(day => {
          let spotsAvailable = day.spots;
          const nameCheck = day.name === state.day;
          const noInterview = state.appointments[action.id].interview;
          const gotInterview = action.interview === null;
          if (nameCheck && gotInterview) {
            spotsAvailable++;
            const spotIncrement = {...day, spots: spotsAvailable};
              return spotIncrement;
          } else if (nameCheck && !noInterview) {
            spotsAvailable--;
            const spotDecrement = {...day, spots: spotsAvailable};
              return spotDecrement;
          }
          return day;
        })
        const appointments = {...state.appointments};
        appointments[action.id].interview = action.interview;
        const appointmentObj = {...state, appointments, days};
        return appointmentObj;
      }
      default:
        throw new Error (
          "Not allowed to perform this action!"
        )
  }
}
/**
 * function useApplicationData is a function that contains multiple utility functions
 * Some of the functions include setting the day, using axios to make get requests to the api server
 * function that books and cancels interviews.
 * @returns Object of functions
 */
export default function useApplicationData() {
  const [state, setState] = useReducer(reducer,{
    day: "Monday",
    days: [],
    appointments: {},
  });
  const setDay = (day) => {
    setState({type: DAYS, day});
  };
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {  
      
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
      const appointment = {
            ...state.appointments[id],
            interview: {...interview}
          }
      const requestUrl = `http://localhost:8001/api/appointments/`+id;
      return axios.put(
        requestUrl, appointment
        )
        .then(response => {
          setState({
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
    function cancelInterview(id){
      const requestUrl = `http://localhost:8001/api/appointments/`+id;
      return new Promise((resolve, reject) => {
        return axios.delete(requestUrl)
        .then((response) => {
          setState({
            type: INTERVIEW,
            id, 
            interview: null
          })
          resolve(response);
        })
        .catch(err => {
          reject(err);
        })
      })
    }
    return {
      state,
      setDay,
      bookInterview,
      cancelInterview,
    }
}
