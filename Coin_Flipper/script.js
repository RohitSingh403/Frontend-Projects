document.addEventListener('DOMContentLoaded', () => {

    // 1. Grab operational interaction node references from the DOM
    const coin = document.getElementById('coin');
    const flipBtn = document.getElementById('flip-btn');
    const resetBtn = document.getElementById('reset-btn');
    const headsCountEl = document.getElementById('heads-count');
    const tailsCountEl = document.getElementById('tails-count');

    // 2. Instantiate data score track metrics
    let headsScore = 0;
    let tailsScore = 0;
    let totalFlips = 0;




