/*all question*/

const questions = [
    {
        question:`Which is the largest animal in the world?`,
        answers:[
            {Text:`shark`,correct:false},
            {Text:`blue whale`,correct:true},
            {Text:`Elepant`,correct:false},
            {Text:`giraffe`,correct:false},
        ]
    },
    {
        question:`Which is the smallest country in the world?`,
        answers:[
            {Text:`vatican city`,correct:true},
            {Text:`bhutan`,correct:false},
            {Text:`nepal`,correct:false},
            {Text:`shri_lanka`,correct:false},
        ]
    },
    {
        question:`What is your village name?`,
        answers:[
            {Text:`munshipara`,correct:false},
            {Text:`guhivita`,correct:false},
            {Text:`horinarayon pur hazipara`,correct:true},
            {Text:`madargonj`,correct:false},
        ]
    },
    {
        question:`What is your name?`,
        answers:[
            {Text:`salim`,correct:false},
            {Text:`sonia`,correct:false},
            {Text:`rakib`,correct:false},
            {Text:`Khadiza`,correct:true},
        ]
    },
]

const questionElement = document.getElementById(`question`);
const answersButtons = document.getElementById(`answer_Buttons`);
const nextButton = document.getElementById(`next_button`);

// dhore nei currentQuestionIndex and score 
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = `Next`;
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement(`button`);
        button.innerHTML = answer.Text;
        button.classList.add(`btn`);
        answersButtons.appendChild(button);


        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener(`click`,selectAnswer)

    })
}

function resetState(){
    nextButton.style.display = `none`;
    while(answersButtons.firstChild){
        answersButtons.removeChild(
            answersButtons.firstChild
        )
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === `true`;
    if(isCorrect){
        selectedBtn.classList.add(`correct`);
        score++;
    }
    else{
        selectedBtn.classList.add(`incorrect`)
    }
    Array.from(answersButtons.children).forEach(button=>{
        if(button.dataset.correct ===`true`){
            button.classList.add(`correct`);
        }
        button.disabled = true;
       
    })
    nextButton.style.display = `block`;
}


function showScore(){
    resetState();
    questionElement.innerHTML = `your scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = `Play Agian`;
    nextButton.style.display = `block`;
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener(`click`, ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})
startQuiz();