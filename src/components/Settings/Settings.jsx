

export default function Settings(props) {
  const minPomodoroMinutes = 10
  const maxPomodoroMinutes = 60
  const minBreakMinutes = 5
  const maxBreakMinutes = 15
  const minLongBreakMinutes = 15
  const maxLongBreakMinutes = 60

  return (
    <div id="settings">
      <div id="time-settings">
        <span>Time (Minutes)</span>
        <div>
          <div id="pomodoro-time">
            <span>Pomodoro ({`${minPomodoroMinutes} - ${maxPomodoroMinutes}`})</span>
            <input onInput={e => {
              let newVal = Math.min(Math.max(e.target.value, minPomodoroMinutes), maxPomodoroMinutes)
              e.target.value = newVal
              props.onPomodoroChange(newVal * 60)
            }} 
              defaultValue="30" 
              type="number" />
          </div>
          <div id="break-time">
            <span>Break ({`${minBreakMinutes} - ${maxBreakMinutes}`})</span>
            <input type="number"></input>
          </div>
          <div id="long-break-time">
            <span>Long break ({`${minLongBreakMinutes} - ${maxLongBreakMinutes}`})</span>
            <input type="number"></input>
          </div>
        </div>
      </div>
    </div>
  );
}
