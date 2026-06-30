document.addEventListener('DOMContentLoaded', () => {

    // 1. Grab operational display node references from the DOM
    const liveClockEl = document.getElementById('live-clock');
    const liveDateEl = document.getElementById('live-date');
    const timerDisplayEl = document.getElementById('timer-display');
    const minutesInput = document.getElementById('minutes-input');
    const secondsInput = document.getElementById('seconds-input');
    const startPauseBtn = document.getElementById('start-pause-btn');
    const resetTimerBtn = document.getElementById('reset-timer-btn');
    const timerInputsZone = document.getElementById('timer-inputs');

    // 2. Instantiate core internal tracker parameters data logic
    let liveClockIntervalId = null;
    let countdownIntervalId = null;
    let totalSecondsRemaining = 0;
    let isTimerRunning = false;


    