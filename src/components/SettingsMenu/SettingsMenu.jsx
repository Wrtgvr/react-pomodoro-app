import TimeInput from '../TimeInput/TimeInput'

export default function Settings(props) {
  const minPomodoroMinutes = 10
  const maxPomodoroMinutes = 60
  const minBreakMinutes = 5
  const maxBreakMinutes = 15
  const minLongBreakMinutes = 15
  const maxLongBreakMinutes = 60

  function onTimeSettingsInputBlur(e, type) {
    let newVal = Math.floor(e.target.value)
    newVal = Math.min(Math.max(newVal, minPomodoroMinutes), maxPomodoroMinutes)
    e.target.value = newVal

    props.updateSettingsTime(type, newVal * 60)
  }

  return (
    <div id="settings">
      <div id="time-settings">
        <span>Time (Minutes)</span>
        
        <div>
          <TimeInput 
            id="pomodoro-time"
            label="Pomodoro"
            minTime={minPomodoroMinutes}
            maxTime={maxPomodoroMinutes}
            onBlur={onTimeSettingsInputBlur}
            defaultValue={props.times[0]}
            type="pomodoro"
          />
          <TimeInput 
            id="break-time"
            label="Break"
            minTime={minBreakMinutes}
            maxTime={maxBreakMinutes}
            onBlur={onTimeSettingsInputBlur}
            defaultValue={props.times[1]}
            type="break"
          />
          <TimeInput 
            id="long-break-time"
            label="Long break"
            minTime={minLongBreakMinutes}
            maxTime={maxLongBreakMinutes}
            onBlur={onTimeSettingsInputBlur}
            defaultValue={props.times[2]}
            type="longBreak"
          />
        </div>
      </div>
      <button 
        id="close-settings-btn"
        onClick={() => props.closeSettings()}>
        Close
      </button>
    </div>
  );
}