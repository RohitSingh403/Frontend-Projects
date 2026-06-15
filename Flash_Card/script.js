const flashcardData = [
  {
    question: "What is the primary difference between var, let, and const?",
    answer:
      "var is function-scoped and hoisted. let and const are block-scoped. const prevents variable reassignment.",
  },
  {
    question: "What is a closure in JavaScript?",
    answer:
      "A closure is a function that remembers and has access to its outer lexical scope even after the outer function finishes executing.",
  },
  {
    question: "What does DOM stand for in web development?",
    answer:
      "DOM stands for Document Object Model. It acts as an API architecture wrapper to let scripts dynamically target and alter webpage tags.",
  },
];

let currentIndex = 0;
const flashcardEl = document.getElementById("flashcard");
const questionTextEl = document.getElementById("question-text");
const answerTextEl = document.getElementById("answer-text");
const progressFillEl = document.getElementById("progress-fill");
const progressTextEl = document.getElementById("progress-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
function updateUI() {
  // A. Reset card state back to normal flat layout before updating texts
  flashcardEl.classList.remove("flipped");

  // B. Map new values into elements
  const currentCard = flashcardsData[currentIndex];
  questionTextEl.innerText = currentCard.question;
  answerTextEl.innerText = currentCard.answer;

  // C. Calculate completion tracking metrics
  const humanIndex = currentIndex + 1;
  const totalCards = flashcardsData.length;
  const progressPercentage = Math.round((humanIndex / totalCards) * 100);

  // D. Assign style rules dynamically
  progressFillEl.style.width = `${progressPercentage}%`;
  progressTextEl.innerText = `${humanIndex} of ${totalCards} (${progressPercentage}%)`;

  // E. Evaluate button active states to avoid array tracking crashes
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === totalCards - 1;
}

// 5. Setup Action Event Listeners
flashcardEl.addEventListener("click", () => {
  flashcardEl.classList.toggle("flipped");
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateUI();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < flashcardsData.length - 1) {
    currentIndex++;
    updateUI();
  }
});

// 6. Bootstrap Application Load Setup Init
updateUI();
