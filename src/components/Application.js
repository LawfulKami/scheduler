import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import React from "react";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import { useApplicationData } from "../hooks/useApplicationData"




export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();


const dailyAppointments = getAppointmentsForDay(state, state.day)
const appointments =  dailyAppointments.map(appointment => {
  const interview = getInterview(state, appointment.interview)
  const interviewers = getInterviewersForDay(state, state.day)
    return <Appointment 
      key={appointment.id}       
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      deleteInterview={deleteInterview}
  />
  })


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
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
        </section>
    </main>
  );
}
