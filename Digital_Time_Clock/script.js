document.addEventListener("DOMContentLoaded", () => {
  // 1. Grab operational display node references from the DOM
  const liveClockEl = document.getElementById("live-clock");
  const liveDateEl = document.getElementById("live-date");
  const timerDisplayEl = document.getElementById("timer-display");
  const minutesInput = document.getElementById("minutes-input");
  const secondsInput = document.getElementById("seconds-input");
  const startPauseBtn = document.getElementById("start-pause-btn");
  const resetTimerBtn = document.getElementById("reset-timer-btn");
  const timerInputsZone = document.getElementById("timer-inputs");

  // 2. Instantiate core internal tracker parameters data logic
  let liveClockIntervalId = null;
  let countdownIntervalId = null;
  let totalSecondsRemaining = 0;
  let isTimerRunning = false;

  // ==========================================
  // MODULE 1: AUTOMATIC LIVE DIGITAL CLOCK CORE
  // ==========================================
  function refreshLiveClockTime() {
    const currentDateTimeInstance = new Date();

    // Extract raw hourly components parameters arrays
    let hours = currentDateTimeInstance.getHours();
    const minutes = currentDateTimeInstance
      .getMinutes()
      .toString()
      .padStart(2, "0");
    const seconds = currentDateTimeInstance
      .getSeconds()
      .toString()
      .padStart(2, "0");
    const ampmMarker = hours >= 12 ? "PM" : "AM";

    // Standardise military clock mappings down into normal 12-hour values
    hours = hours % 12;
    hours = hours ? hours : 12; // Evaluates zero hour edge cases cleanly to 12
    const formattedHours = hours.toString().padStart(2, "0");

    // Render string values out directly onto display layouts
    liveClockEl.innerText = `${formattedHours}:${minutes}:${seconds} ${ampmMarker}`;

    // Format calendar locale data strings cleanly
    const textOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    liveDateEl.innerText = currentDateTimeInstance.toLocaleDateString(
      "en-IN",
      textOptions,
    );
  }

  // Initialize clock refresh rendering stream cycles every single second
  liveClockIntervalId = setInterval(refreshLiveClockTime, 1000);
  refreshLiveClockTime(); // Kickstart instant render view cleanly to bypass loop delay

  // ==========================================
  // MODULE 2: COUNTDOWN TIMER ENGINE PIPELINES
  // ==========================================

  // Auxiliary helper function to string format raw total seconds to modern "MM:SS" tokens [STEM]
  function formatTimeTokenString(totalSecs) {
    const mins = Math.floor(totalSecs / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSecs % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function processTimerTick() {
    if (totalSecondsRemaining <= 0) {
      // Terminate interval operations directly once count hits zero boundary [STEM]
      clearInterval(countdownIntervalId);
      countdownIntervalId = null;
      isTimerRunning = false;

      timerDisplayEl.innerText = "00:00";
      timerDisplayEl.style.color = "#ef4444"; // Visual Alert flashing Crimson Red
      startPauseBtn.innerText = "Start";
      startPauseBtn.className = "action-btn play-btn";
      startPauseBtn.disabled = true;

      alert("Time's up! Your countdown period has concluded.");
      return;
    }

    totalSecondsRemaining--;
    timerDisplayEl.innerText = formatTimeTokenString(totalSecondsRemaining);
  }

  function executeStartPauseAction() {
    if (isTimerRunning) {
      // ACTIVE RUNTIME -> PAUSE ACTION PIPELINE
      clearInterval(countdownIntervalId);
      countdownIntervalId = null;
      isTimerRunning = false;

      startPauseBtn.innerText = "Resume";
      startPauseBtn.className = "action-btn play-btn";
    } else {
      // PAUSED/IDLE -> ACTIVE RUNTIME ACTION PIPELINE

      // If starting fresh from idle state, extract and parse field input data parameters [STEM]
      if (countdownIntervalId === null && totalSecondsRemaining === 0) {
        const parsedMins = parseInt(minutesInput.value) || 0;
        const parsedSecs = parseInt(secondsInput.value) || 0;

        totalSecondsRemaining = parsedMins * 60 + parsedSecs; // Convert to total seconds [STEM]

        // Prevent tracking process operations on completely empty entries
        if (totalSecondsRemaining <= 0) return;
      }

      // Lock structural numeric configuration inputs during runtime operations
      setInputsDisabledState(true);
      resetTimerBtn.disabled = false;

      timerDisplayEl.style.color = ""; // Fallback default typography visual accent rules
      isTimerRunning = true;
      startPauseBtn.innerText = "Pause";
      startPauseBtn.className = "action-btn pause-active";

      // Initialize precision asynchronous interval pipeline loop [STEM]
      countdownIntervalId = setInterval(processTimerTick, 1000);
    }
  }

  function executeResetAction() {
    // Halt processing timing intervals instantly
    clearInterval(countdownIntervalId);
    countdownIntervalId = null;
    isTimerRunning = false;
    totalSecondsRemaining = 0;

    // Restore default interface baseline configurations rules
    setInputsDisabledState(false);
    resetTimerBtn.disabled = true;
    startPauseBtn.disabled = false;
    timerDisplayEl.style.color = "";

    startPauseBtn.innerText = "Start";
    startPauseBtn.className = "action-btn play-btn";

    // Sync display text values to match whatever numerical settings sit inside inputs
    const currentMinsSetting = parseInt(minutesInput.value) || 0;
    const currentSecsSetting = parseInt(secondsInput.value) || 0;
    const combinedSeconds = currentMinsSetting * 60 + currentSecsSetting;
    timerDisplayEl.innerText = formatTimeTokenString(combinedSeconds);
  }

  function setInputsDisabledState(disabledFlag) {
    minutesInput.disabled = disabledFlag;
    secondsInput.disabled = disabledFlag;
    if (disabledFlag) {
      timerInputsZone.style.opacity = "0.3";
    } else {
      timerInputsZone.style.opacity = "";
    }
  }
  // Sync screen displays dynamically in real-time as users modify input parameters
  function handleLiveInputChange() {
    // Enforce basic numerical range bounds parsing safeguards
    let m = parseInt(minutesInput.value) || 0;
    let s = parseInt(secondsInput.value) || 0;

    if (s > 59) {
      s = 59;
      secondsInput.value = 59;
    }
    if (m > 99) {
      m = 99;
      minutesInput.value = 99;
    }
    if (m < 0) {
      m = 0;
      minutesInput.value = 0;
    }
    if (s < 0) {
      s = 0;
      secondsInput.value = 0;
    }

    if (!isTimerRunning && countdownIntervalId === null) {
      timerDisplayEl.innerText = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
  }

  // 3. Connect delegated event layout listeners across interface interactive components
  startPauseBtn.addEventListener("click", executeStartPauseAction);
  resetTimerBtn.addEventListener("click", executeResetAction);
  minutesInput.addEventListener("input", handleLiveInputChange);
  secondsInput.addEventListener("input", handleLiveInputChange);
});
