const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {
                text: "Shark", correct: false
            },
            {
                text: "Elephant", correct: false
            },
            {
                text: "Blue whale", correct: true
            },
            {
                text: "Giraffe", correct: false
            }
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {
                text: "Vatican city", correct: true
            },
            {
                text: "Bhutan", correct: false
            },
            {
                text: "Nepal", correct: false
            },
            {
                text: "Srilanka", correct: false
            }
        ]
    },
    {
        question: "Which is the largest dessert in the world?",
        answers: [
            {
                text: "Kalahari", correct: false
            },
            {
                text: "Gobi", correct: false
            },
            {
                text: "Sahara", correct: false
            },
            {
                text: "Antarctica", correct: true
            }
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {
                text: "Asia", correct: false
            },
            {
                text: "Australia", correct: true
            },
            {
                text: "Arctic", correct: false
            },
            {
                text: "Africa", correct: false
            }
        ]
    }
];


const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');

let currentquestionindex = 0;
let score = 0;

function startQuiz()
{
    currentquestionindex = 0;
    score = 0;
    nextBtn.innerHTML = 'Next';
    showQuestion();
}


function showQuestion()
{
    resetgame();

    let currentQuestion = questions[currentquestionindex];
    let questionNo = currentquestionindex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(function (answer) {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click",selectAnswer);

    })
}

function resetgame()
{
    nextBtn.style.display = 'none';
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === 'true';
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }
    else
    {
        selectedbtn.classList.add('incorrect');
    }
    Array.from(answerButton.children).forEach(function (button){
        if(button.dataset.correct === 'true')
        {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextBtn.style.display = 'block';
}

function showscore()
{
    resetgame();
    questionElement.innerHTML = `You scores ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = 'Play Again';
    nextBtn.style.display = 'block';
}


function handleNextButton()
{
    currentquestionindex++;
    if(currentquestionindex < questions.length)
    {
        showQuestion();
    }
    else
    {
        showscore();
    }
}

nextBtn.addEventListener("click",() => {
    if(currentquestionindex < questions.length){
        handleNextButton();
    }
    else
    {
        startQuiz();
    }
});


startQuiz();

