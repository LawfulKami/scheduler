import { useState } from "react"


export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  const cleanPop = (arr) => {
    return arr.filter((ele, index) => index !== arr.length -1)
  }

  function transition(newMode, replace) {
    setMode(newMode)
    if (!replace) {
    setHistory([...history, newMode])
    } else {
    const newHistory = cleanPop(history)
    setHistory([...newHistory, newMode])
    }
  }
  function back(){
    if (history.length > 1) {
    const newHistory = cleanPop(history)
    setMode(newHistory[newHistory.length -1])
    setHistory([...newHistory])
    }
  }

  return { mode, transition, back  }
}