import { useState, useEffect } from 'react'
import './App.css'
import SettingsMenu from './components/SettingsMenu/SettingsMenu'

export default function App() {
  const defaultPomodoro = 25 
  const [timerSeconds, setTimerSeconds] = useState(defaultPomodoro * 60) // Current time on the timer
  const [paused, setPaused] = useState(true)
  const [settingsOpened, setSettingsOpened] = useState(false)
  const [mode, setMode] = useState("pomodoro")

  const [pomodoroTime, setPomodoroTime] = useState(defaultPomodoro * 60) // Work time - minutes * 60
  const [breakTime, setBreakTime] = useState(5 * 60)
  const [longBreakTime, setLongBreakTime] = useState(15 * 60)

  const timeUpdaters = {
    pomodoro: setPomodoroTime,
    break: setBreakTime,
    longBreak: setLongBreakTime,
  }
  const typeToTime = {
    pomodoro: pomodoroTime,
    break: breakTime,
    longBreak: longBreakTime,
  }

  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        setTimerSeconds(prevVal => Math.max(prevVal - 1, 0))
      }, 1000)
      return () => clearInterval(interval)
    }
  })

  useEffect(() => {
    resetTimer(mode)
  }, [mode])

  function updateSettingsTime(type, val) {
    timeUpdaters[type](val)
  }

  function convertSecondsToTimer(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  function resetTimer(modeOverride) {
    const activeMode = modeOverride || mode
    
    const time = typeToTime[activeMode];

    setPaused(true)
    setTimerSeconds(time) 
  }

  return (
    <main>
      <div id="timer-container">
        <div id="timer-modes-wrapper">
          {["pomodoro", "break", "longBreak"].map(type => (
            <button
              key={type}
              className={mode === type ? "chosen-mode-btn" : ""}
              onClick={() => setMode(type)}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div id="timer-wrapper">
          <span>{convertSecondsToTimer(timerSeconds)}</span><br/>
        </div>

        <div id="timer-controls">
          <button onClick={() => {
              setPaused(prevState => !prevState)
            }}> {!paused ? "Pause" : "Resume"} </button>
            <button onClick={() => resetTimer()}> Reset </button>
            <button onClick={() => setSettingsOpened(prevVal => !prevVal)}>
              Settings
            </button>
        </div>
      </div>
      {settingsOpened &&
        <div id="settings-container">
          <SettingsMenu 
            times={[pomodoroTime / 60, breakTime / 60, longBreakTime / 60]} 
            updateSettingsTime={updateSettingsTime} 
            closeSettings={() => setSettingsOpened(false)}/>
        </div>
      }
    </main>
  )
}