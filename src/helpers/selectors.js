export function getAppointmentsForDay(state, day) {
  const results = [];
  if (!state.days || !state.appointments ||state.days.filter(currDay => currDay.name === day).length < 1) {
    return results
  }

  const appointments = state.days.filter(currDay => currDay.name === day)[0].appointments;
  
  for (const appId of appointments) {
    results.push(state.appointments[appId])
  }

  return results;
}