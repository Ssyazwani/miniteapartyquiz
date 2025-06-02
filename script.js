const startBtn = document.getElementById('startBtn');
const landingPage = document.getElementById('landingPage');
const quizContent = document.getElementById('quizContent');

startBtn.addEventListener('click', () => {
  landingPage.style.display = 'none';
  quizContent.style.display = 'block';


});


const questions = [
  "If you found a mysterious door, what would you do?",
  "Which Wonderland place would you visit first?",
  "What’s your favorite kind of companion?",
  "How do you solve tricky problems?",
  "What’s your dream adventure?"
];

const options = [
  [
    "Open it bravely like Alice",
    "Check your watch and plan carefully like The White Rabbit",
    "Smile mysteriously like The Cheshire Cat",
    "Declare your rule like The Queen of Hearts"
  ],
  [
    "The colorful Garden of Talking Flowers",
    "The Mad Tea Party",
    "The Enchanted Forest",
    "The Queen’s Castle"
  ],
  [
    "Curious friends who ask lots of questions",
    "Punctual friends who keep you on track",
    "Funny friends who make you laugh",
    "Loyal friends who stand up for you"
  ],
  [
    "With creativity and imagination",
    "By staying organized and on schedule",
    "By thinking outside the box",
    "By being assertive and confident"
  ],
  [
    "Exploring new magical worlds",
    "Having a never-ending tea party",
    "Solving riddles and mysteries",
    "Leading a grand adventure for your friends"
  ]
];

const resultMap = {
  a: {
    name: "Alice",
    message: "Curious and imaginative, you see the world as a place full of wonder and endless possibilities. You balance logic with creativity, embracing every unexpected twist with open arms.",
    bgImage: "url('images/alice-bg.jpg')"
  },
  b: {
    name: "The White Rabbit",
    message: "Always on the move and a bit anxious, you’re driven and punctual. Though sometimes hurried, your heart is in the right place, and you inspire others to follow their path.",
    bgImage: "url('images/white-rabbit-bg.jpg')"
  },
  c: {
    name: "The Cheshire Cat",
    message: "Mysterious and witty, you have a mischievous charm and a knack for showing others new perspectives. You embrace the strange and find joy in the unexpected.",
    bgImage: "url('images/cheshire-cat-bg.jpg')"
  },
  d: {
    name: "The Queen of Hearts",
    message: "Bold and commanding, you know what you want and aren’t afraid to go after it. Beneath your strong exterior, there’s a passionate and loyal heart.",
    bgImage: "url('images/queen-hearts-bg.jpg')"
  },
  tie: {
    name: "The Mad Hatter",
    message: "Creative, whimsical, and a little unpredictable, you bring fun and energy wherever you go. Your unique outlook on life encourages others to think outside the box and celebrate their quirks.",
    bgImage: "url('images/mad-hatter-bg.jpg')"
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

  const result = topLetters.length > 1 ? resultMap["tie"] : resultMap[topLetters[0][0]];

  resultDiv.style.backgroundImage = result.bgImage;
  resultDiv.innerHTML = `
    <h2>${result.name}</h2>
    <p>${result.message}</p>

    <p>Enter your special word to see your custom page:</p>
    <input type="text" id="secretCodeInput" placeholder="Type your secret word" />
    <button id="goSpecialBtn">Go</button>
    <div id="specialMsg"></div>
  `;

  // Now the elements exist — attach the listener here:
  document.getElementById('goSpecialBtn').addEventListener('click', () => {
    const code = document.getElementById('secretCodeInput').value.trim().toLowerCase();
    const specialCodes = {
      'elna': 'elna.html',
      'syahirah': 'syahirah.html',
      'kirti': 'kirti.html'
    };

    if (specialCodes[code]) {
      window.location.href = specialCodes[code];
    } else {
      document.getElementById('specialMsg').textContent = "Sorry, that word doesn't match any special page. Try again!";
    }
  });
}


