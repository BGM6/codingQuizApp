//HTML elements
let $homePage = document.querySelector("#homepage");
let $startBtn = document.querySelector("#start-btn");
let $quiz = document.querySelector("#quiz");
let $timer = document.querySelector("#timer");
let $questions = document.querySelector("#questions");
let $result = document.querySelector("#result");
let $gameOver = document.querySelector("#gameover");
let $finalScore = document.querySelector("#final-score");
let $initials = document.querySelector("#initials");
let $submitScore = document.querySelector("#submit-score");
let $highScoreContainer = document.querySelector("#highscore-container");
let $highScorePage = document.querySelector("#highscore-page");
let $highscoreDisplayName = document.querySelector("#highscore-initials");
let $highscoreDisplayScore = document.querySelector("#highscore-score");
let $gameOverBtn = document.querySelector("#gameover-btn");
let $buttonA = document.querySelector("#a");
let $buttonB = document.querySelector("#b");
let $buttonC = document.querySelector("#c");
let $buttonD = document.querySelector("#d");


// Quiz Questions
let quizQuestions = [{
    question: "Inside which HTML element do we put the JavaScript?",
    choiceA: "<script>",
    choiceB: "<scripting>",
    choiceC: "<javascript>",
    choiceD: "<js>",
    correctAnswer: "a"
},
{
    question: "Where is the correct place to insert a JavaScript?",
    choiceA: "The <head> section",
    choiceB: "Both the <head> section and the <body> section are correct",
    choiceC: "The <body> section",
    choiceD: "Outside the <html> tag",
    correctAnswer: "c"
},
{
    question: "How do you write 'Hello World' in an alert box?",
    choiceA: "alertBox('Hello World');",
    choiceB: "alert('Hello World');",
    choiceC: "print('Hello World');",
    choiceD: "puts 'Hello World';",
    correctAnswer: "b"
},
{
    question: "How do you create a function in JavaScript?",
    choiceA: "function:myFunction()",
    choiceB: "function myFunction()",
    choiceC: "function = myFunction()",
    choiceD: "function = myFunction[]",
    correctAnswer: "c"
},
{
    question: "What does HTML stand for?",
    choiceA: "Home Tool Markup Language",
    choiceB: "Hyper Text Markup Language",
    choiceC: "Hyperlinks and Text Markup Languange",
    choiceD: "None of the above",
    correctAnswer: "b"
},
{
    question: "What does CSS stand for?",
    choiceA: "Colorful Style Sheets",
    choiceB: "Cascading Style Sharing",
    choiceC: "Cascading Style Sheets",
    choiceD: "Computer Style Sheets",
    correctAnswer: "c"
},
{
    question: "Which property is used to change the font of an element?",
    choiceA: "font-family",
    choiceB: "change-font",
    choiceC: "font-weight",
    choiceD: "font-style",
    correctAnswer: "a"
},

];

// global variables
let finalQuestionIndex = quizQuestions.length;
let currentQuestionIndex = 0;
let timeLeft = 15;
let timerInterval;
let score = 0;
let correct;

//This Function needs to cycle through the object array of quiz questions to generate questions and the answers

function quizQuestionGenerator() {
    $gameOver.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        // need to create userScore function that shows userScore after the game ends
        return  userScore(); 
    }
    let currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD
};

// Start Quiz function 
function startQuiz() {
    $gameOver.style.display = "none";
    $homePage.style.display = "none";
    quizQuestionGenerator();

    //Timer
    timerInterval = setInterval(function () {
        timeLeft--;
        $timer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    $quiz.style.display = "block";
}

