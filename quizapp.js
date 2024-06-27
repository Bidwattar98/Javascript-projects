const questions = [
    {
        question: "Which is the largest animal in the world",
        answers: [
            {text: "shark", correct: false},
            {text: "blue whate", correct: true},
            {text: "elephant", correct: false},
            {text: "giraffe", correct: false},
        ]
    },
    {
        question: "who has alwas got a plan",
        answers: [
            {text: "Micah", correct: false},
            {text: "Dutch", correct: true},
            {text: "Arthur", correct: false},
            {text: "John", correct: false},
        ]
    },
    {
        question: "who will win 2024 world cup",
        answers: [
            {text: "India", correct: true},
            {text: "England", correct: false},
            {text: "Pakistan", correct: false},
            {text: "South Africa", correct: false},
        ]
    }
];

const questionelement = document.getElementById("question");
const answerbutton = document.getElementById("answerbuttons");
const nextbtn = document.getElementById("nextbtn");

let currentquestionindex = 0;
let score = 0;
function startQuiz(){
    currentquestionindex = 0;
    score = 0;
    nextbtn.innerHTML = "Next";
    showquestion();
}

function showquestion(){
    resetstate();
    let currentquestion = questions[currentquestionindex];
    let questionNo = currentquestionindex +1;
    questionelement.innerHTML = questionNo + ". "+ currentquestion.question;

    currentquestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectanswer);
    });
}

function resetstate(){
    nextbtn.style.display = "none";
    while (answerbutton.firstChild) {
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectanswer(e){
    const selectedbutton = e.target;
    const iscorrect = selectedbutton.dataset.correct === "true";
    if (iscorrect) {
        selectedbutton.classList.add("correct");
        score++;
    }
    else{
        selectedbutton.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbtn.style.display = "block";
}

function showscore(){
    resetstate();
    questionelement.innerHTML = `Your score: ${score} out of ${questions.length}!`;
    nextbtn.innerHTML = "Play again!";
    nextbtn.style.display = "block";
}

function handlenextbutton(){
    currentquestionindex++;
    if(currentquestionindex < questions.length){
        showquestion();
    }
    else{
        showscore();
    }
}

nextbtn.addEventListener("click", () =>{
    if(currentquestionindex < questions.length){
        handlenextbutton();
    }
    else{
        startQuiz();
    }
})

startQuiz();