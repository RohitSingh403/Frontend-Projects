document.addEventListener('DOMContentLoaded', () => {

    // 1. Grab operational interaction layout targets from the DOM
    const displayScreen = document.getElementById('display-screen');
    const historyScreen = document.getElementById('history-screen');
    const keypad = document.querySelector('.keypad-matrix');

    // 2. Instantiate application data logic parameters trackers
    let currentInputString = '0';
    let isCalculationComplete = false;

    // 3. Write Central State Matrix Input Appending Logic Loop
    function processInputPress(buttonElement) {
        const numberValue = buttonElement.getAttribute('data-value');
        const actionValue = buttonElement.getAttribute('data-action');

        // A. Handle structural clear operations resets clean back to baseline
        if (actionValue === 'clear') {
            currentInputString = '0';
            historyScreen.innerText = '';
            displayScreen.innerText = '0';
            return;
        }

        