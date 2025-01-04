import { useState, useEffect } from 'react'
import './App.css'
import SettingsMenu from './components/SettingsMenu/SettingsMenu'

export default function App() {
  const defaultPomodoro = 25 
  const [timerSeconds, setTimerSeconds] = useState(defaultPomodoro * 60) // Current time on the timer
  const [paused, setPaused] = useState(true)
  const [started, setStarted] = useState(false)
  const [settingsOpened, setSettingsOpened] = useState(false)
  const [mode, setMode] = useState("pomodoro")

  const [pomodoroTime, setPomodoroTime] = useState(defaultPomodoro * 60) // Work time - minutes * 60
  const [breakTime, setBreakTime] = useState(5 * 60)
  const [longBreakTime, setLongBreakTime] = useState(15 * 60)

  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        setTimerSeconds(prevVal => Math.max(prevVal - 1, 0))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [paused])

  function convertSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  function settingsTimeUpdate(type, newVal_Seconds) {
    switch (type) {
      case "pomodoro":
        setPomodoroTime(newVal_Seconds)
        break
      case "break":
        setBreakTime(newVal_Seconds)
        break
      case "longBreak":
        setLongBreakTime(newVal_Seconds)
        break
    }
  }

  return (
    <main>
      <div id="timer-container">
        <div id="timer-modes-wrapper">
          <button onClick={() => setMode("pomodoro")}>Pomodoro</button>
          <button onClick={() => setMode("break")}>Break</button>
          <button onClick={() => setMode("longBreak")}>Long break</button>
        </div>

        <div id="timer-wrapper">
          <span>{convertSeconds(timerSeconds)}</span><br/>
        </div>

        <div id="timer-controls">
          <button onClick={() => {
              setPaused(prevState => !prevState)
              setStarted(true)
            }}> {!paused ? "Pause" : started ? "Resume" : "Start"} </button>
            <button onClick={() => {
              setPaused(true)
              setStarted(false)
              setTimerSeconds(pomodoroTime)
            }}> Reset </button>
            <button onClick={() => setSettingsOpened(prevVal => !prevVal)}>
              Settings
            </button>
        </div>
      </div>
      {settingsOpened &&
        <div id="settings-container">
          <SettingsMenu 
            times={[pomodoroTime / 60, breakTime / 60, longBreakTime / 60]} 
            updateTime={settingsTimeUpdate} 
            closeSettings={() => setSettingsOpened(false)}/>
       </div>}
    </main>
  )
}