import "components/Application.scss";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors"
import axios from "axios";
import React, { useState, useEffect } from "react";
import DayList from "./DayList"
import Appointment from "./Appointment/index";
import { getInterviewersForDay } from "../helpers/selectors"




export default function Application(props) {
 const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {}
});

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
   return axios.put(`/api/appointments/${id}`, { interview })
    .then(res => {
      setState({
        ...state,
        appointments
      })
  })
}

function deleteInterview(id) {
  const appointments = {
    ...state.appointments,
    };
  return axios.delete(`/api/appointments/${id}`)
    .then(res => {
      setState({
        ...state,
        appointments
      })
  })
}

const setDay = day => setState({ ...state, day });

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





  useEffect(() => { 
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({...prev, days : all[0].data, appointments : all[1].data, interviewers: all[2].data}))
    });
  }, [])

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
