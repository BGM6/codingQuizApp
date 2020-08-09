//HTML elements 
const startQuizDiv = document.querySelector("#homepage");
const quizBody = document.querySelector("#quizSection");
const resultsEl = document.querySelector("#result");
const endScore = document.querySelector("#endScore");
const gameoverDiv = document.querySelector("#gameOver");
const questionsQ = document.querySelector("#quizQuestions");
const quizTime = document.querySelector("#time");
const startQuizButton = document.querySelector("#startbtn");
const highscoreContainer = document.querySelector("#highscoreContainer");
const highscoreDiv = document.querySelector("#high-scorePage");
const highscoreInputName = document.querySelector("#initials");
const highscoreDisplayName = document.querySelector("#highscore-initials");
const endGameBtns = document.querySelector("#endGameBtns");
const submitScoreBtn = document.querySelector("#submitScore");
const highscoreDisplayScore = document.querySelector("#highscore-score");
const btnA = document.querySelector("#a");
const btnB = document.querySelector("#b");
const btnC = document.querySelector("#c");
const btnD = document.querySelector("#d");


// The array of quiz Questions
const quizQuestions = [

    {
        question: "Where is the correct place to insert a JavaScript?",
        choiceA: "The head section",
        choiceB: "Both the <head> section and the <body> section are correct",
        choiceC: "The body section",
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
    {
        question: "What year was javaScript created?",
        choiceA: "1995",
        choiceB: "1984",
        choiceC: "1996",
        choiceD: "2003",
        correctAnswer: "a"
    },

    {
        question: "Inside which HTML element do we put the JavaScript?",
        choiceA: "script",
        choiceB: "scripting",
        choiceC: "javascript",
        choiceD: "js",
        correctAnswer: "a"
    },
];

//  Global variables
let finalQuestionIndex = quizQuestions.length;
let currentQuestionIndex = 0;
let timeLeft = 61;
let timerInterval;
let score = 0;
let correct;

// This function generates the quiz questions
function questionGenerator() {
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsQ.innerHTML = "<p>" + currentQuestion.question + "</p>";
    btnA.innerHTML = currentQuestion.choiceA;
    btnB.innerHTML = currentQuestion.choiceB;
    btnC.innerHTML = currentQuestion.choiceC;
    btnD.innerHTML = currentQuestion.choiceD;
};

// This function will start the quiz, timer
function startQuiz() {
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    questionGenerator();

    //Timer
    timerInterval = setInterval(function () {
        timeLeft--;
        quizTime.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}
// This function shows the end page screen after the quiz is compelted or the timer runs out
function showScore() {
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    endScore.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// This function runs the highscore screen where the user can input their initial to store their high scores
submitScoreBtn.addEventListener("click", function highscore() {

    if (highscoreInputName.value === "") {
        alert("You must enter your initials");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        highScoreGenerator();

    }

});

// This function clears the high scores and generates a new high score list from local storage
function highScoreGenerator() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page 
function showHighscore() {
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    highScoreGenerator();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This function resets the quiz so user can replay
function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks if the user gets the question correct or incorrect
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        questionGenerator();
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("Incorrect.")
        currentQuestionIndex++;
        questionGenerator();
    } else {
        showScore();
    }
}

// Button that will start the quiz
startQuizButton.addEventListener("click", startQuiz);