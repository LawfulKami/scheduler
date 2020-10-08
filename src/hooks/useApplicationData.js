import { useState, useEffect } from "react";
import axios from "axios";


export function useApplicationData() {
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
     .then(() => axios.get("/api/days"))
     .then((res) => {
       setState(prev => ({...prev, appointments, days : res.data}))
   })
  }
  
  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
        [id] : appointment
      };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => axios.get("/api/days"))
      .then((res) => {
        setState(prev => ({...prev, appointments, days : res.data}))
    })
  }

  
  function setDay(day) {
    return setState(prev => {
      return { ...prev, day }
    });
  } 

  
  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)


    webSocket.onmessage = ((event) => {
      const message = JSON.parse(event.data)
      if (message.type === "SET_INTERVIEW") {
        axios.get("/api/days")
        .then((res) => setState(prev => {
          const newInt = message.interview
          const newAppointment = { ...prev.appointments[message.id], interview : newInt}
          const newAppointments = { ...prev.appointments, [message.id] : newAppointment}
          return ({...prev, appointments: newAppointments, days : res.data})
        }))
      }
    })

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({...prev, days : all[0].data, appointments : all[1].data, interviewers: all[2].data}))
    })
        
  }, [])
  






    return { state, setDay, bookInterview, deleteInterview }
}






