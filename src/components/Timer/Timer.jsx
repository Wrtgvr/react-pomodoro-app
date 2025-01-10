export default function Timer(props) {

  function convertSecondsToTimer(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div id="timer-container">
      <div id="timer-modes-wrapper">
        {["pomodoro", "break", "longBreak"].map((type) => (
          <button
            key={type}
            className={props.mode === type ? "chosen-mode-btn" : ""}
            onClick={() => props.setMode(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div id="timer-wrapper">
        <span>{convertSecondsToTimer(props.timerSeconds)}</span>
        <br />
      </div>

      <div id="timer-controls">
        <button
          onClick={() => {
            props.timerSetPaused((prevState) => !prevState);
          }}
        >
          {" "}
          {!props.timerPaused ? "Pause" : "Resume"}{" "}
        </button>
        <button onClick={() => props.resetTimer()}> Reset </button>
        <button onClick={() => props.setSettingsOpened((prevVal) => !prevVal)}>
          Settings
        </button>
      </div>
    </div>
  );
}
