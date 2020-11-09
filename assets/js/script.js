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
