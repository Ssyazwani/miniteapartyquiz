const startBtn = document.getElementById('startBtn');
const landingPage = document.getElementById('landingPage');
const quizContent = document.getElementById('quizContent');

startBtn.addEventListener('click', () => {
  landingPage.style.display = 'none';
  quizContent.style.display = 'block';


});


const questions = [
  "You stumble upon a glowing pink flower deep in the meadow — it's pulsing with magic. What do you do first?",
  "You want to grow and blossom into a flower but you would need a good starting point, which story intro would appear to you the most?",
  "A garden is always better with company. Which companion blossoms beside you on this journey?",
  "After a long day tending the fields, some monsters threatens to pick all your produce and flowers. How do you handle this sudden garden crisis?",
  "If your life were a story written in petals and stems, what kind of blooming tale would it be?"
];


const options = [
  // Question 1: Something Unknown
  [
    "Think about it, and Open  excitement and wonder, ready to see what magic awaits inside.", // Yellow
    "Think about it and check your supplies and plan carefully before stepping through, making sure you’re prepared. You do have some days off", // Blue
    "Think about out well craved the door is, text your friends and family about where you are going and and open the door", // Pink
    "Not think about it and kick the door open boldly and step through without hesitation — no time to waste!" // Orange
  ],
  // Question 2: Where do you want to start
  [
    "In a homely village, where I would need to leave my home for awhile with my cute companion", // Yellow
    "A sudden accident/tragic happen to one of your family members, so you set out to investigate", // Blue
    "When you walked into a library and was approached by a cute guy to help you be his fake date", // Pink
    "You overheard that there is a unknown place, with no chance of turning back but you are able to meet a new life there" // Orange
  ],
  // Question 3: Companion
  [
    "Cheerful cute bear who bring joy and curiosity to every moment.", // Yellow
    "A calm shapeshifter owl who gives wisdom from time to time, not sure if its the right time sometimes", // Blue
    "Our band of witches or a cute guy who is a green forest and treats me like I am royalty", // Pink
    "Some strong warriors who’ll fight fiercely and stand by your side no matter what - cause you bribe them" // Orange
  ],
  // Question 4: Challenge
  [
    "Use the bear as a decoy and tackle the monsters with a smile — bringing fun even to the toughest battles.", // Yellow
    "Ask the owl if he can fly us out of there or POOF teleport away using magics, its called using brains", // Blue
    "Our band of witches who is able to outsmart them or where is my strong man who is willing to help me that is at my side?", // Pink
    "Say 'Let’s do this!' and face the monsters head-on, no matter how tired you are — because you live life on your own terms. Use a scarecrow? Where has my warriors gone" // Orange
  ],
  // Question 5: Type of story do you want
  [
    "A bright and joyful tale full of wonder, friendships, and endless adventures.", // Yellow
    "A tale filled with mysteries and also where hard work and determination overcome every obstacle. And a good vacation!", // Blue
    "A easygoing and light hearted tale of how I am able to meet my true prince, with cute moments.", // Pink
    "A bold legend of living free, making your own rules, and seizing every moment." // Orange
  ]
];


const resultMap = {
  a: {
    name: "Yellow Flower",
    message: `Sunshine, positivity, and joy. You're the friend who brings warmth and optimism wherever you go.
     Full of imagination and light-hearted fun..`,
    bgImage: "../images/yellowflower.jpg"
  },
  b: {
    name: "Blue Flower",
    message: `Calm, strategic, and quietly driven. 
    You might feel the pressure, but your determination and depth of thought shine through even in chaos.
    I see you, and I am here too whenever you need me`,
    bgImage: "../images/blueflower.jpg"
  },
  c: {
    name: "Pink Flower",
    message: `Trendy, witty, and effortlessly cool. 
    You're in touch with yourself and always on top of what's new. 
    Self-care is your thing, and you make it look easy.`,
    bgImage: "../images/pinkflower.jpg"
  },
  d: {
    name: "Orange Flower",
   message: `YOLO energy! Bold, passionate, and unapologetically yourself. 
   Life’s short — you know it, and you’re making every moment count.
   It is your life and you have only one chance to live and you want to live it on your own terms.`,
    bgImage: "../images/orangeflower.jpg"
  },
  tie: {
    name: "Indigo Flower",
    message: ` Balanced, adaptable, and easy-going. You are such a chill person.
    You flow with life’s ups and downs and find peace in being grounded, 
    no matter the chaos around you. `,
    bgImage: "../images/purplflower.jpg"
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

  const key = topLetters.length > 1 ? "tie" : topLetters[0][0];
  const result = resultMap[key];

 
  resultDiv.innerHTML = '';

  
  const resultImg = document.createElement('img');
  resultImg.src = result.bgImage;  
  resultImg.alt = result.name;
  resultImg.style.width = '400px';
  resultImg.style.height = 'auto';
  resultImg.style.borderRadius = '15px';
  resultImg.style.marginBottom = '15px';
  resultDiv.appendChild(resultImg);

 
  const title = document.createElement('h2');
  title.textContent = result.name;
  resultDiv.appendChild(title);

 
  const message = document.createElement('p');
  message.className = 'result';
  message.style.fontSize = '1em'; 
  message.textContent = result.message;
  resultDiv.appendChild(message);

 
  const instruction = document.createElement('p');
  instruction.textContent = "Enter your special word to see your custom page:";
  resultDiv.appendChild(instruction);

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'secretCodeInput';
  input.placeholder = 'Type your secret word';
  resultDiv.appendChild(input);

  const goBtn = document.createElement('button');
  goBtn.id = 'goSpecialBtn';
  goBtn.textContent = 'Go';
  resultDiv.appendChild(goBtn);

  const specialMsg = document.createElement('div');
  specialMsg.id = 'specialMsg';
  resultDiv.appendChild(specialMsg);

  goBtn.addEventListener('click', () => {
    const code = input.value.trim().toLowerCase();
    const specialCodes = {
      'elna': '../pages/elna.html',
      'syahirah': '../pages/syahirah.html',
      'kirti': '../pages/kirti.html',
      'special': '../pages/special.html'
    };

    if (specialCodes[code]) {
      window.location.href = specialCodes[code];
    } else {
      specialMsg.textContent = "Sorry, that word doesn't match any special page. Try again!";
    }
  });
}
