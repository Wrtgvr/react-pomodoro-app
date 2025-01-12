import pauseIcon from './../../assets/pause-icon.png'
import playIcon from './../../assets/play-icon.png'
import resetIcon from './../../assets/reset-icon.png'
import settingsIcon from './../../assets/settings-icon.png'

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
        <button id="pause-button"
          onClick={() => {
            props.timerSetPaused((prevState) => !prevState);
          }}>
          {!props.timerPaused ? 
            <img
              class='button__image'
              src={pauseIcon}
            /> : 
            <img
              class='button__image'
              src={playIcon}
            /> 
          }
        </button>
        <button onClick={() => props.resetTimer()}>
          <img
            class='button__image'
            src={resetIcon}
          /> 
        </button>
        <button onClick={() => props.setSettingsOpened((prevVal) => !prevVal)}>
          <img
            class='button__image'
            src={settingsIcon}
          /> 
        </button>
      </div>
    </div>
  );
}