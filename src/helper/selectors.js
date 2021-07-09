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

export function getInterviewersForDay(state, day) {
  const getDay = state.days.find((currentDay) => currentDay.name === day);
  if(!getDay){
    return [];
  }
  const getInterviewers = getDay.interviewers;
  if(!getInterviewers) {
    return [];
  }
  const returnValue = getInterviewers.map(i => state.interviewers[i]);
  return returnValue;
  
}