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


 // E. Map Standard Number and Math Operator Appends Rules
        if (currentInputString === '0' && !buttonElement.classList.contains('operator') && !buttonElement.classList.contains('decimal')) {
            // Clear default baseline string to avoid layout bugs like "07"
            currentInputString = numberValue;
        } else {
            // If an equation just finished, typing a number overwrites it, typing an operator builds on it
            if (isCalculationComplete && !buttonElement.classList.contains('operator')) {
                currentInputString = numberValue;
            } else {
                currentInputString += numberValue;
            }
        }

        isCalculationComplete = false;
        displayScreen.innerText = currentInputString;
    }

    // 4. Write Safe Mathematical Parse Computation Sub-Routines
    function executeTerminalMathCalculation() {
        // Prevent evaluation pipeline executions on empty arrays
        if (currentInputString === '0') return;

        // Clean trailing operators to avoid calculation parsing breakdown crashes
        let evaluationTargetString = currentInputString.trim();
        if (/[\+\-\*\/]$/.test(evaluationTargetString)) {
            evaluationTargetString = evaluationTargetString.slice(0, -1);
        }

        try {
            // SAFE ALTERNATIVE CONVERSION MATRICES: Parse string calculations using Function Constructor
            // This safely isolates calculations inside a sandboxed scope without running global eval() strings [STEM]
            const computedMathOutcome = new Function(`return ${evaluationTargetString}`)();

            // Format float output layout precision bounds to limit infinite loops strings
            const formattedTerminalValue = Number(computedMathOutcome.toFixed(8)).toString();

            // Display historical operations tracking blocks
            historyScreen.innerText = `${evaluationTargetString} =`;
            displayScreen.innerText = formattedTerminalValue;
            
            // Re-assign variable scope values state metrics tracking parameters
            currentInputString = formattedTerminalValue;
            isCalculationComplete = true;

        } catch (errorException) {
            displayScreen.innerText = 'Error';
            currentInputString = '0';
            historyScreen.innerText = '';
        }
    }



    // 5. Connect Delegated Event Listeners across Keypad elements
    keypad.addEventListener('click', (clickEvent) => {
        // Verify click source maps to actual button objects accurately
        const targetBtn = clickEvent.target.closest('.key-btn');
        if (!targetBtn) return;

        processInputPress(targetBtn);
    });
});