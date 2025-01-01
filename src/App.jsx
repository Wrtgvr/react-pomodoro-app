import { useState, useEffect } from 'react'
import './App.css'
import Settings from './components/Settings/Settings'

export default function App() {
  const defaultPomodoro = 25 
  const [timerSeconds, setTimerSeconds] = useState(defaultPomodoro * 60) // Current time on the timer
  const [paused, setPaused] = useState(true)
  const [settingsOpened, setSettingsOpened] = useState(false)

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
      <div id="timer-wrapper">
        <span>{convertSeconds(timerSeconds)}</span><br/>
        <button onClick={() => {
          setPaused(prevState => !prevState)
        }}> {paused ? "Start" : "Pause"} </button>
        <button onClick={() => {
          setPaused(true)
          setTimerSeconds(pomodoroTime)
        }}> Reset </button>
      </div>

      <div id="settings-container">
        <button onClick={() => setSettingsOpened(prevVal => !prevVal)}>
          Settings
        </button>
        {settingsOpened && 
          <Settings updateTime={settingsTimeUpdate} />}
      </div>
    </main>
  )
}