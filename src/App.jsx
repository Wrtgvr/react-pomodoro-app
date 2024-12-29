import { useState, useEffect } from 'react'
import './App.css'
import Settings from './components/Settings/Settings'

export default function App() {
  const [timerSeconds, setTimerSeconds] = useState(1800)
  const [paused, setPaused] = useState(true)
  const [settingsOpened, setSettingsOpened] = useState(false)
  const [pomodoroTime, setPomodoroTime] = useState(1800)

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

  function onPomodoroChange(e) {
    const newVal = e.target.value * 60 // Convert minutes to seconds
    setPomodoroTime(newVal)
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
        {settingsOpened && <Settings onPomodoroChange={onPomodoroChange}/>}
      </div>
    </main>
  )
}