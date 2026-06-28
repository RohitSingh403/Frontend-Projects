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

          // B. Handle incremental character string deletions step by step backtracks
        if (actionValue === 'delete') {
            if (currentInputString.length > 1) {
                currentInputString = currentInputString.slice(0, -1);
            } else {
                currentInputString = '0';
            }
            displayScreen.innerText = currentInputString;
            return;
        }

         // C. Evaluate computation processing commands execution pipeline
        if (actionValue === 'calculate') {
            executeTerminalMathCalculation();
            return;
        }

        // D. Prevent duplicate formatting decimal structures inside character groups
        if (buttonElement.classList.contains('decimal')) {
            // Find active terminal string fragment block components array
            const activeStringParts = currentInputString.split(/[\+\-\*\/]/);
            const currentWorkingSegment = activeStringParts[activeStringParts.length - 1];
            
            if (currentWorkingSegment.includes('.')) {
                return; // Exit loop to avoid entering invalid formatting arrays like "5.5.2"
            }
        }



        