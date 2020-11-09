// Variables for the main section
var quizContentEl = document.querySelector("#quiz-content");
var questionCount = 0;
var contentHeading = document.getElementById("content-heading");
var contentArea = document.getElementById("content-area");
var counter = 75;
var countDownEl = document.getElementById("count");
var correctOrWrong = "";
var scores = [];

// Function to begin timer 
var startTimer = function() {
    var countDown = function() {
        countDownEl.innerText = counter;
        counter--;

        if (counter === 0 || questionCount === questions.length) {
            clearInterval(timer);
            allDone();
        }
    };

    if (counter === 75) {
        var timer = setInterval(countDown, 1000);
    } 
};

// Array for questions and answers
var questions = [
        { question: "Commonly used data types do NOT include:", a1: "strings", a2: "booleans", a3: "alerts", a4: "numbers", correctAnswer: "alerts" },
    
        { question: "The condition in an If/Else statement is enclosed with:", a1: "quotes", a2: "parenthesis", a3: "curly brackets", a4: "square brackets", correctAnswer: "parenthesis" },
    
        { question: "Arrays in Javascript can be used to store________.", a1: "numbers and strings", a2: "other arrays", a3: "booleans", a4: "all of the above", correctAnswer: "all of the above" },
    
        { question: "String variables must be enclosed in ________ when being assigned to variables.", a1: "commas", a2: "curly brackets", a3: "quotes", a4: "parenthesis", correctAnswer: "quotes" },
    
        { question: "A very useful tool used during development and debugging for printing content to the debugger is:", a1: "javascript", a2: "terminal/bash", a3: "for loops", a4: "console.log", correctAnswer: "for loops" },
    
];

// function to start the quiz
var startQuiz = function() {
    questionCount = 0;
    counter = 75;
    contentHeading.innerText = "Coding Quiz Challenge";
    contentArea.innerHTML = "<p>Try to answer the following code-related questions within the time limit.<br> Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p></br><button id='start-button'>Start Quiz!</button>";
    document.getElementById("start-button").addEventListener("click", presentQuestion);
    document.getElementById("start-button").addEventListener("click", startTimer);
    return;
};

// function to handle presentation of questions
var presentQuestion = function() {
    contentHeading.innerText = questions[questionCount].question;
    contentArea.innerHTML = 
        "<button id='answer-button1'>" + questions[questionCount].a1 + 
        "</button></br><button id='answer-button2'>" + questions[questionCount].a2 + 
        "</button></br><button id='answer-button3'>" + questions[questionCount].a3 +
        "</button></br><button id='answer-button4'>" + questions[questionCount].a4 + 
        "</button>";

    var feedback = document.createElement("h2");
    feedback.textContent = correctOrWrong;
    contentArea.appendChild(feedback);

    document.getElementById("answer-button1").addEventListener("click", confirmAnswer);
    document.getElementById("answer-button2").addEventListener("click", confirmAnswer);
    document.getElementById("answer-button3").addEventListener("click", confirmAnswer);
    document.getElementById("answer-button4").addEventListener("click", confirmAnswer);
};


var confirmAnswer = function(event) {
    
    var targetEl = event.target;
    // Conditional statement to check if answer is correct
    if (targetEl.textContent === questions[questionCount].correctAnswer) {
        correctOrWrong = "Correct!"
    } else {
        correctOrWrong = "Wrong!";
        counter -= 10;
    }
    questionCount++;
    return presentQuestion();
};


var allDone = function() {
    
    contentHeading.innerText = "All Done!";
    contentArea.innerHTML = "<p>Your final score is " + counter + "</p><br/>";
    var enterHighScore = document.createElement("input");

    enterHighScore.name = "user-initials";
  
    contentArea.appendChild(enterHighScore);

    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.id = "submit-button";
    contentArea.appendChild(submitButton);
    document.getElementById("submit-button").addEventListener("click", handleSubmit);
};


//function triggered by the submit of the initials
var handleSubmit = function() {
    var initialInput = document.querySelector("input[name='user-initials'");
    var scoreAndInitials = {
        initials: initialInput.value,
        score: counter
    };
    scores.push(scoreAndInitials);
    saveScores();
    getScores();
    scores.sort((a, b) => b.score - a.score);
    printHighScores();
};

var saveScores = function() {
    localStorage.setItem("scores", JSON.stringify(scores));
};

// function to update scores array 
var getScores = function() {
    if (scores.length > 0) {
        scores = localStorage.getItem("scores");
        scores = JSON.parse(scores);
   }
}; 

// function to print high scores
var printHighScores = function() {
    contentHeading.innerText = "High Scores";
    contentArea.textContent = "";
    
    var orderedListEl = document.createElement("ol");
    for (i = 0; i < scores.length; i++) {
        var listItemEl = document.createElement("li");
        listItemEl.textContent = scores[i].initials + " - " + scores[i].score;
        orderedListEl.appendChild(listItemEl);
        contentArea.appendChild(orderedListEl);
    };
    // button to go back to the start
    var goBackButton = document.createElement("button");
    goBackButton.textContent = "Go Back";
    goBackButton.id = "go-back";
    contentArea.appendChild(goBackButton);
    document.getElementById("go-back").addEventListener("click", startQuiz);

    // button to clear the high scores
    var clearStorage = document.createElement("button");
    clearStorage.textContent = "Clear High Scores";
    clearStorage.id = "clear-storage";
    contentArea.appendChild(clearStorage);
    document.getElementById("clear-storage").addEventListener("click", clearHighScores);
}; 

var clearHighScores = function() {
    localStorage.clear();
    scores = [];
    startQuiz();
};

startQuiz();
document.getElementById("high-score-button").addEventListener("click", printHighScores);
getScores();
