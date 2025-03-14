//DECLARAMOS E ASIGNAMOS LAS VARIABLES INICIALES
let questions = []; //lista de preguntas
let index = 0;  //índice para cada pregunta a recorrer
let total_correct_answers = 0; //número total de respuestas correctas

//OBTENEMOS EL BOTÓN Y LA CAJA DONDE PODER MOSTRAR LAS PREGUNTAS
const spanQuestion = document.getElementById("spanQuestion");
spanQuestion.addEventListener("click", getQuestions);
const questionsBox = document.getElementById("questionsBox");

//VAMOS MOSTRANDO UNA A UNA LAS PREGUNTAS CON SUS RESPUESTAS
function showQuestion() {
    questionsBox.classList.remove("hide");

    if (index < questions.length) {
        questionsBox.innerHTML =
            "<p>" +
            questions[index].question +
            "</p><ul><li><input type='radio' name='option' id='option1' value='"+questions[index].answers[0]+"'/>" +
            questions[index].answers[0] +
            "<li><input type='radio' name='option' id='option2' value='"+questions[index].answers[1]+"'/>" +
            questions[index].answers[1] +
            "<li><input type='radio' name='option' id='option3' value='"+questions[index].answers[2]+"'/>" +
            questions[index].answers[2] +
            "<li><input type='radio' name='option' id='option4' value='"+questions[index].answers[3]+"'/>" +
            questions[index].answers[3] +
            "<br><br><button onclick='checkAnswer(questions)'>NEXT</button>";
    } else {
        // MUESTRA EL RESULTADO FINAL DEL QUIZ
        questionsBox.innerHTML = "<h2>"+total_correct_answers+"/"+questions.length+" QUESTIONS ANSWERED CORRECTLY</h2>"
    }
}

function checkAnswer(questions) {

    let activeOption = document.querySelector('input[name="option"]:checked').value;

    if(activeOption == questions[index].correct_answer){
        alert('CORRECT!!');
        total_correct_answers++;
    } else {
        alert('INCORRECT!!')
    }

    index++;
    showQuestion();
}

//SACAMOS Y ALMACENAMOS LAS PREGUNTAS Y SUS RESPUESTAS EN DISTINTOS ARRAYS
async function getQuestions() {
    questions = [];
    index = 0;
    await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
        .then((res) => res.json())
        .then((data) => {
            data.results.forEach((data) => {
                data.answers = [...data.incorrect_answers,data.correct_answer].sort();
                questions.push(data);
            });
            showQuestion();
        })
        .catch((error) => console.log("ERROR TO LOAD QUESTIONS", error));
}
