const startBtn = document.getElementById('startBtn');
const landingPage = document.getElementById('landingPage');
const quizContent = document.getElementById('quizContent');

startBtn.addEventListener('click', () => {
  landingPage.style.display = 'none';
  quizContent.style.display = 'block';


});


const questions = [
  "A door magically appears next to you,What’s your first move?",
  "Oh ho ho ho, Where does your fairytale journey begin?",
  "Who do you want as your companion in this story?",
  "Oh no, after a long day of work, an unfriendly and lazy colleague appeared and asked you to defeat these monsters in 2 hours. How do you tackle a challenge ?",
  "What is your motivation to get through life"
];


const options = [
 [
 
  "Open it with excitement and wonder, ready to see what magic awaits inside.",
  "Are you serious? I have work to do, no leaves, no",
  "Pause to think and look for hidden clues around the door, using your cleverness.",
  "Kick the door open boldly and step through without hesitation — LIFE IS AN ADVENTURE"
],
[
  "At a wonderful magical world ~ overseas",
  "At my house maybe",
  "In a library or some public place you know",
  "Whenever I want to since well, it's my life"
],
 [
  "Cheerful animals who bring joy and curiosity to every moment by singing. Need to bring some earplugs",
  "Reliable friends,or just me,myself and I",
  "Ayo, CHATGPT, FREE CHATGPT",
  "Loyal warriors who’ll fight fiercely and stand by your side no matter what, in this world is mercenaries"
],
[
  "Take a deep breath, and think, maybe the monsters would just go away soon since its time to go home",
  "Nah man, I am done for the day, ask the monsters to come back tomorrow or something",
  "Give him some money and whispered to him 'Can't beat them, bride them - with your money ' and take your money back and leave",
  "If you feel like it, you kill them if not,meh good times flies fast you know"
],
 [
  "A bright future awaits all of us",
  "A long vacation awaits all of us",
  "A mind simulating project or my hobby awaits all of us",
  "Your favourite food and show awaits all of us"
],

];

const resultMap = {
  a: {
    name: "Happy/Sunshine",
    message: `Curious and imaginative, you see the world as a place full of wonder and endless possibilities. 
    You bring color into the lives of those around you, balancing logic with creativity.
    You’re the type to find joy in small things and turn the ordinary into something magical. 
    Wherever you go, fun and warmth follow. Never lose that spark — the world needs more of it.`,
    bgImage: "../images/sunshine.jpg"
  },
  b: {
    name: "Overworked 24/7",
    message: `Always on the move, a little anxious, but incredibly driven — you get things done, no matter what. 
    Your to-do list might be longer than your patience some days, but your determination is unmatched. 
    Even when the world feels chaotic, your heart stays in the right place. 
    You inspire others just by showing up and pushing forward. Just don’t forget to rest — you deserve it.`,
    bgImage: "../images/overworked.jpg"
  },
  c: {
    name: "Let's Get this Straight My Man",
    message: `Mysterious, witty, and a little bit chaotic — you’re the kind of person who turns confusion into clarity with just one clever comment. 
     You have a unique way of showing others new perspectives, sometimes without even trying. 
     You don’t shy away from the strange — you embrace it and make it your own. 
     And hey, if no one’s told you today: I’m proud of you. Seriously. Keep being you.`,
    bgImage: "../images/straight.jpg"
  },
  d: {
    name: "YOLO LIVE YOUR LIFE MAN",
   message: `You know exactly what you want and aren’t afraid to chase it. 
   Beneath your strong exterior lies a passionate and loyal heart, 
   always ready to stand firm for what (and who) you believe in.
   It is your life and you have only one chance to live and you want to live it on your own terms.
   Life won't all be easy but your got this my man, or girl, or whatever you are. Hang it there!`,
    bgImage: "../images/yolo.jpg"
  },
  tie: {
    name: "You are balanced my guy",
    message: `You got a balanced answer, congratulations! You don't really earn anything haha.
    You are navigating life with whatever suits the situations, when you need to be positive, you need to take risks and if you are plain tired.
    Life isn't that easy but I hope you take care of yourself and perhaps if possible, have a peace of mind from the chaos around you.
    You might be an easy-going kinda person, so I hope everyone will be as easy-going as you, peace out! `,
    bgImage: "../images/balanced.jpg"
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
    alert("Please select an answer before moving on!!");
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
