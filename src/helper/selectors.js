/**
 * Function gets all the appointments for each day. 
 * If the day parameter is null, the empty list will be returned
 * else an array of all the appointments for the day is returned.
 * @param {*} state 
 * @param {*} day 
 * @returns results
 */
export function getAppointmentsForDay(state, day) {
  let results = [];

  const dayObj = state.days.find(d => d.name === day);
  if (!dayObj) {
    return [];
  }

  for (const appt of dayObj.appointments) {
    results.push(state.appointments[appt]);
  }
  return results;
}
/**
 * Function gets a specific interview.
 * Chcked is the interview object is null, if it is, it will return null
 * else it will get the interview details and return the contents in an instance of the parent object.
 * @param {*} state 
 * @param {*} interview 
 * @returns 
 */
export function getInterview (state, interview) {
  if(!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  return {
    ...interview,
    interviewer
  };
};

/**
 * Function gets the interviews for the day
 * The function will return the empty list if the days object is null or there is no interviewers. 
 * otherwise it will map the interviewers and return them as an array.
 * @param {*} state 
 * @param {*} day 
 * @returns 
 */
export function getInterviewersForDay(state, day) {
  const getDay = state.days.find((currentDay) => currentDay.name === day);
  const getInterviewers = getDay.interviewers;
  if(!getDay || !getInterviewers){
    return [];
  }
  const returnValue = getInterviewers.map(i => state.interviewers[i]);
  return returnValue;
  
}