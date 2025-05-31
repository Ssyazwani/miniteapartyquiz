const questions = [
  "Which describes you best?",
  "Your ideal weekend plan?",
  "How do you make decisions?",
  "What motivates you?",
  "What's your role in a group?"
];

const options = [
  ["Take charge 💼", "Go with the flow 🌊", "Follow your dreams 🌈", "Help everyone 🤝"],
  ["Organize an event 🎉", "Relax with a book 📖", "Go on an adventure 🚀", "Volunteer 🧡"],
  ["Logic & facts 🧠", "Gut feeling 💗", "Big picture 🌌", "What helps others 🌍"],
  ["Winning 🏆", "Peace ✌️", "Creativity 🎨", "Kindness 🫶"],
  ["Leader 🧭", "Observer 👀", "Visionary 🔮", "Supporter 💪"]
];

const resultMap = {
  a: { name: "🌟 Star", message: "Bold, bright, and a natural leader!" },
  b: { name: "🌙 Moon", message: "Calm and intuitive — a deep thinker." },
  c: { name: "🌅 Sunrise", message: "Creative and full of new ideas!" },
  d: { name: "🌇 Sunset", message: "Kind, loyal, and supportive." },
  tie: { name: "☁️ Sky", message: "Balanced and versatile like the open sky!" }
};

const quizDiv = document.getElementById('quiz');
const submitBtn = document.getElementById('submit'); // match your HTML
const resultDiv = document.getElementById('result'); // match your HTML

// Dynamically render questions
questions.forEach((question, i) => {
  const container = document.createElement('div');
  container.classList.add("question-block");
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

// Handle submission
submitBtn.addEventListener('click', () => {
  const counts = { a: 0, b: 0, c: 0, d: 0 };

  for (let i = 0; i < questions.length; i++) {
    const val = document.querySelector(`input[name="q${i}"]:checked`);
    if (val) {
      counts[val.value]++;
    } else {
      alert("Please answer all the questions 💖");
      return;
    }
  }

  const max = Math.max(...Object.values(counts));
  const topLetters = Object.entries(counts).filter(([_, val]) => val === max);

  const result = topLetters.length > 1
    ? resultMap["tie"]
    : resultMap[topLetters[0][0]];

  resultDiv.innerHTML = `
    <h2>${result.name}</h2>
    <p>${result.message}</p>
  `;
});
