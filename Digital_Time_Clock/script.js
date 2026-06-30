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


    // ==========================================
    // MODULE 1: AUTOMATIC LIVE DIGITAL CLOCK CORE
    // ==========================================
    function refreshLiveClockTime() {
        const currentDateTimeInstance = new Date();
        
        // Extract raw hourly components parameters arrays
        let hours = currentDateTimeInstance.getHours();
        const minutes = currentDateTimeInstance.getMinutes().toString().padStart(2, '0');
        const seconds = currentDateTimeInstance.getSeconds().toString().padStart(2, '0');
        const ampmMarker = hours >= 12 ? 'PM' : 'AM';
        
        // Standardise military clock mappings down into normal 12-hour values
        hours = hours % 12;
        hours = hours ? hours : 12; // Evaluates zero hour edge cases cleanly to 12
        const formattedHours = hours.toString().padStart(2, '0');

        // Render string values out directly onto display layouts
        liveClockEl.innerText = `${formattedHours}:${minutes}:${seconds} ${ampmMarker}`;

        // Format calendar locale data strings cleanly
        const textOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        liveDateEl.innerText = currentDateTimeInstance.toLocaleDateString('en-IN', textOptions);
    }
