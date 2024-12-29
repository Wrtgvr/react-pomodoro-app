

export default function Settings(props) {
  return (
    <div id="settings">
      <div id="time-settings">
        <span>Time (Minutes)</span>
        <div>
          <div id="pomodoro-time">
            <span>Pomodoro</span>
            <input onBlur={props.onPomodoroChange} 
              defaultValue="30" 
              type="number" />
          </div>
          <div id="break-time">
            <span>Break</span>
            <input type="number"></input>
          </div>
          <div id="long-break-time">
            <span>Long break</span>
            <input type="number"></input>
          </div>
        </div>
      </div>
    </div>
  );
}
