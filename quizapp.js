const apiUrl = 'https://opentdb.com/api.php';
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerbuttons");
const nextButton = document.getElementById("nextbtn");
const startQuizButton = document.getElementById("start-quiz-btn");
const quizSettingsForm = document.getElementById("quiz-settings");

let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let numberOfQuestions = 5; // Default number of questions

async function fetchQuestions() {
    const numQuestions = parseInt(document.getElementById("num-questions").value);
    numberOfQuestions = numQuestions; // Update numberOfQuestions based on user input

    const category = 9; // Example category for General Knowledge, you can change this
    const difficulty = "medium"; // Example difficulty, you can change this

    const url = `${apiUrl}?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        questions = data.results.map(result => ({
            question: result.question,
            correct_answer: result.correct_answer,
            incorrect_answers: result.incorrect_answers
        }));
        startQuiz();
    } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Failed to fetch questions. Please try again later.');
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    quizSettingsForm.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + decodeHtml(currentQuestion.question);

    // Combine correct and incorrect answers for randomization
    let answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    answers = shuffleArray(answers);

    answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = decodeHtml(answer);
        button.classList.add("btn");
        if (answer === currentQuestion.correct_answer) {
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score: ${score} out of ${numberOfQuestions}!`;
    nextButton.innerHTML = "Play again!";
    nextButton.style.display = "block";
    quizSettingsForm.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < numberOfQuestions) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < numberOfQuestions) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuizButton.addEventListener("click", fetchQuestions);

// Helper function to shuffle array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Helper function to decode HTML entities
function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}
