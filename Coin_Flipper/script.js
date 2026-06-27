document.addEventListener("DOMContentLoaded", () => {
  // 1. Grab operational interaction node references from the DOM
  const coin = document.getElementById("coin");
  const flipBtn = document.getElementById("flip-btn");
  const resetBtn = document.getElementById("reset-btn");
  const headsCountEl = document.getElementById("heads-count");
  const tailsCountEl = document.getElementById("tails-count");

  // 2. Instantiate data score track metrics
  let headsScore = 0;
  let tailsScore = 0;
  let totalFlips = 0;

  // 3. Write Core Coin Flip Execution Routine
  function executeCoinFlip() {
    // Disable click interaction safely during active flipping animation
    flipBtn.disabled = true;

    // Generate a random outcome: 0 for Heads, 1 for Tails
    const coinOutcome = Math.floor(Math.random() * 2);

    // Calculate variable spin multipliers to increase revolutions dynamically over time
    totalFlips++;
    const completeRevolutions = totalFlips * 720; // Spins full 720 degrees minimum each time

    // Calculate specific terminal angle targets based on random outcome
    let targetDegreesX = completeRevolutions;
    if (coinOutcome === 1) {
      targetDegreesX += 180; // Adds half-spin offset to land upside down on Tails face
    }

    // Apply 3D matrix transform updates directly to structural elements
    coin.style.transform = `rotateX(${targetDegreesX}deg)`;

    // Delay score metric counter calculations until animation completes
    setTimeout(() => {
      if (coinOutcome === 0) {
        headsScore++;
        headsCountEl.innerText = headsScore;
      } else {
        tailsScore++;
        tailsCountEl.innerText = tailsScore;
      }
      // Restore click interaction safely
      flipBtn.disabled = false;
    }, 1200); // Matches the 1.2s animation transition duration set in CSS
  }

  // 4. Write Scoreboard Reset Routine
  function resetScoreboard() {
    headsScore = 0;
    tailsScore = 0;
    totalFlips = 0;

    headsCountEl.innerText = "0";
    tailsCountEl.innerText = "0";

    // Snap coin geometry orientation settings smoothly back to default baseline configurations
    coin.style.transform = "rotateX(0deg)";
  }

  // 5. Connect operational click layout pipelines
  flipBtn.addEventListener("click", executeCoinFlip);
  resetBtn.addEventListener("click", resetScoreboard);
});