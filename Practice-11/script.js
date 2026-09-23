// — Quiz Application

const questions = [

  {
    question: "Which keyword declares a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: "const"
  },

  {
    question: "Which method converts JSON string into JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.object()"
    ],
    answer: "JSON.parse()"
  },

  {
    question: "Which method adds an item at the end of an array?",
    options: [
      "push()",
      "pop()",
      "shift()",
      "unshift()"
    ],
    answer: "push()"
  },

  {
    question: "Which keyword is used for asynchronous functions?",
    options: [
      "async",
      "await",
      "promise",
      "defer"
    ],
    answer: "async"
  },

  {
    question: "Which method creates a new array from another array?",
    options: [
      "map()",
      "forEach()",
      "find()",
      "some()"
    ],
    answer: "map()"
  }

];


let currentQuestion = 0;
let userScore = 0;
let selected = false;


const questionNumber =
  document.querySelector("#questionNumber");

const score =
  document.querySelector("#score");

const progress =
  document.querySelector("#progress");

const question =
  document.querySelector("#question");

const options =
  document.querySelector("#options");

const nextBtn =
  document.querySelector("#nextBtn");

const quizCard =
  document.querySelector("#quizCard");

const result =
  document.querySelector("#result");

const finalScore =
  document.querySelector("#finalScore");

const restartBtn =
  document.querySelector("#restartBtn");


const loadQuestion = () => {

  selected = false;

  const current =
    questions[currentQuestion];

  questionNumber.textContent =
    `Question ${currentQuestion + 1}/${questions.length}`;

  score.textContent =
    `Score: ${userScore}`;

  question.textContent =
    current.question;

  progress.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  options.innerHTML = "";

  nextBtn.classList.add("hidden");


  current.options.forEach(option => {

    const button =
      document.createElement("button");

    button.textContent = option;

    button.className =
      "w-full text-left p-4 rounded-xl " +
      "bg-slate-800 border border-slate-700 " +
      "hover:border-cyan-400 transition";

    button.addEventListener(
      "click",
      () => selectAnswer(button, option)
    );

    options.appendChild(button);

  });

};


const selectAnswer = (button, answer) => {

  if (selected) return;

  selected = true;

  const correct =
    questions[currentQuestion].answer;


  if (answer === correct) {

    userScore++;

    button.classList.add(
      "bg-green-600"
    );

  } else {

    button.classList.add(
      "bg-red-600"
    );

    [...options.children].forEach(
      option => {

        if (option.textContent === correct) {
          option.classList.add(
            "bg-green-600"
          );
        }

      }
    );

  }


  score.textContent =
    `Score: ${userScore}`;

  nextBtn.classList.remove("hidden");

};


nextBtn.addEventListener("click", () => {

  currentQuestion++;

  if (currentQuestion < questions.length) {

    loadQuestion();

  } else {

    showResult();

  }

});


const showResult = () => {

  quizCard.classList.add("hidden");

  result.classList.remove("hidden");

  finalScore.textContent =
    `${userScore} / ${questions.length}`;

};


restartBtn.addEventListener("click", () => {

  currentQuestion = 0;

  userScore = 0;

  result.classList.add("hidden");

  quizCard.classList.remove("hidden");

  loadQuestion();

});


loadQuestion();