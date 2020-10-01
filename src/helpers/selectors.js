export function getAppointmentsForDay(state, day) {
  const dayFound = state.days.find(currDay => currDay.name === day);

  if (!dayFound) return []

  return dayFound.appointments.map(app => state.appointments[app]);
}

export function getInterview(state, interview) {
  if (!interview) return null
  const interviewer = state.interviewers[interview.interviewer]
  const results = {
    student : interview.student,
    interviewer
  }
  return results
}

export function getInterviewersForDay(state, day) {
  const dayFound = state.days.find(currDay => currDay.name === day);

  if (!dayFound) return []
  return dayFound.interviewers.map(int => state.interviewers[int]);
}