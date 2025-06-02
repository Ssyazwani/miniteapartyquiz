const questions = [
  "How would you spend a magical afternoon in the enchanted forest?",
  "Which of these lovely activities sounds most delightful to you?",
  "When faced with a mysterious choice, how do you decide your path?",
  "What magical gift do you cherish most from your heart?",
  "What role would you play in a kingdom of dreams?"
];

const options = [
  [
    "Lead the royal tea party 🫖",
    "Drift on a gentle fairy breeze 🧚‍♀️",
    "Follow the sparkling rainbow trail 🌈",
    "Care for all woodland creatures 🐿️"
  ],
  [
    "Host a moonlit dance under twinkling stars ✨",
    "Curl up with a book of ancient spells 📜",
    "Embark on a quest through mystical lands 🗺️",
    "Tend to the village garden with love 🌷"
  ],
  [
    "Listen to the wisdom of the old oak tree 🌳",
    "Trust the whisper of your heart 💖",
    "Imagine the grand story yet to unfold 📖",
    "Choose what will bring joy to others 🌟"
  ],
  [
    "The courage of a brave knight 🛡️",
    "The calm of a peaceful night 🌙",
    "The sparkle of a creative dreamer 🎨",
    "The kindness of a gentle friend 🕊️"
  ],
  [
    "The noble leader of the court 👑",
    "The watchful guardian of secrets 🔍",
    "The visionary seer of futures 🔮",
    "The loyal companion by your side 🤗"
  ]
];

const resultMap = {
  a: {
    name: "👸 Cinderella",
    message: "Graceful and hopeful, you always find the light even in the darkest times."
  },
  b: {
    name: "🧙‍♂️ Merlin the Wizard",
    message: "Wise and mysterious, you possess deep knowledge and a calm presence."
  },
  c: {
    name: "🌹 Belle",
    message: "Curious and kind, you see the beauty in the world and in others."
  },
  d: {
    name: "🦸‍♀️ Robin Hood",
    message: "Brave and loyal, you stand up for what’s right and help those in need."
  },
  tie: {
    name: "🌟 The Storybook Hero",
    message: "A perfect blend of qualities — you are the heart of any adventure."
  }
};



const quizDiv = document.getElementById('quiz');
const nextBtn = document.getElementById('nextBtn');
const resultDiv = document.getElementById('result');

let currentQuestion = 0;
const totalQuestions = questions.length;
const answers = {};

questions.forEach((question, i) => {
  const container = document.createElement('div');
  container.classList.add("question-block");
  container.dataset.index = i;
  if (i !== 0) container.style.display = "none";

  container.innerHTML = `<p><strong>${question}</strong></p>`;

  ['a', 'b', 'c', 'd'].forEach((letter, j) => {
    const option = options[i][j];
    const input = `
      <label>
        <input type="radio" name="q${i}" value="${letter}" />
        ${option}
      </label><br>`;
    container.innerHTML += input;
  });

  quizDiv.appendChild(container);
});

nextBtn.addEventListener('click', () => {
  const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
  if (!selected) {
    alert("Please select an answer before moving on 💖");
    return;
  }

  answers[`q${currentQuestion}`] = selected.value;

  const currentDiv = document.querySelector(`.question-block[data-index="${currentQuestion}"]`);
  currentDiv.style.display = "none";

  currentQuestion++;

  if (currentQuestion < totalQuestions) {
    const nextDiv = document.querySelector(`.question-block[data-index="${currentQuestion}"]`);
    nextDiv.style.display = "block";

    if (currentQuestion === totalQuestions - 1) {
      nextBtn.textContent = "Submit";
    }
  } else {
    nextBtn.style.display = "none";
    showResults();
  }
});

function showResults() {
  const counts = { a: 0, b: 0, c: 0, d: 0 };
  Object.values(answers).forEach(letter => {
    counts[letter]++;
  });

  const max = Math.max(...Object.values(counts));
  const topLetters = Object.entries(counts).filter(([_, val]) => val === max);

  const result = topLetters.length > 1
    ? resultMap["tie"]
    : resultMap[topLetters[0][0]];

  resultDiv.innerHTML = `
    <h2>${result.name}</h2>
    <p>${result.message}</p>
  `;
}
