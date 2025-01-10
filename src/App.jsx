import { useState, useEffect } from "react";
import "./App.css";
import SettingsMenu from "./components/SettingsMenu/SettingsMenu";
import Timer from "./components/Timer/Timer";

export default function App() {
  const defaultPomodoro = 25;
  const [timerSeconds, setTimerSeconds] = useState(defaultPomodoro * 60); // Current time on the timer
  const [paused, setPaused] = useState(true);
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [mode, setMode] = useState("pomodoro");

  const [pomodoroTime, setPomodoroTime] = useState(defaultPomodoro * 60); // Work time - minutes * 60
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [longBreakTime, setLongBreakTime] = useState(15 * 60);

  const timeUpdaters = {
    pomodoro: setPomodoroTime,
    break: setBreakTime,
    longBreak: setLongBreakTime,
  };
  const typeToTime = {
    pomodoro: pomodoroTime,
    break: breakTime,
    longBreak: longBreakTime,
  };

  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        setTimerSeconds((prevVal) => Math.max(prevVal - 1, 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  useEffect(() => {
    resetTimer(mode);
  }, [mode]);

  function updateSettingsTime(type, val) {
    timeUpdaters[type](val);
  }

  function resetTimer(modeOverride) {
    const activeMode = modeOverride || mode;
    const time = typeToTime[activeMode];

    setPaused(true);
    setTimerSeconds(time);
  }

  return (
    <>
      <header>
        <h1>Pomodoro App</h1>
      </header>
      <main>
        <Timer
          mode={mode}
          setMode={setMode}
          timerSeconds={timerSeconds}
          timerSetPaused={setPaused}
          resetTimer={resetTimer}
          setSettingsOpened={setSettingsOpened}
          timerPaused={paused}
        />
        {settingsOpened && (
          <div id="settings-container">
            <SettingsMenu
              times={[pomodoroTime / 60, breakTime / 60, longBreakTime / 60]}
              updateSettingsTime={updateSettingsTime}
              closeSettings={() => setSettingsOpened(false)}
            />
          </div>
        )}
      </main>
    </>
  );
}
