//DECLARAMOS E ASIGNAMOS LAS VARIABLES INICIALES
let questions = []; //lista de preguntas
let index = 0;  //índice para cada pregunta a recorrer
let indexAnswers = 0;   //índice para cada respuesta a recorrer

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
            "<li><input type='radio' name='option' id='option2' value='option2'/>" +
            questions[index].answers[1] +
            "<li><input type='radio' name='option' id='option3' value='option3'/>" +
            questions[index].answers[2] +
            "<li><input type='radio' name='option' id='option4' value='option4'/>" +
            questions[index].answers[3] +
            "<br><br><button onclick='getRadioValue()'>NEXT</button>";

        index++;
    }
}

function getRadioValue() {
    const option1 = document.getElementById('option1');
    const option2 = document.getElementById('option2');
    const option3 = document.getElementById('option3');
    const option4 = document.getElementById('option4');

    showQuestion();
}

//SACAMOS Y ALMACENAMOS LAS PREGUNTAS Y SUS RESPUESTAS EN DISTINTOS ARRAYS
async function getQuestions() {
    questions = [];
    index = 0;
    indexAnswers = 0;
    await fetch("https://opentdb.com/api.php?amount=4&type=multiple")
        .then((res) => res.json())
        .then((data) => {
            questionsBox.classList.add("hide");
            questionsBox.innerHTML = "";
            data.results.forEach((data) => {
                /* console.log('QUESTION:',data); */
                data.answers = [...data.incorrect_answers,data.correct_answer]
                questions.push(data);
                /* questions.push(data.answers); */

                //correctAnswers.push(data.correct_answer);
                //incorrectAnswers.push(data.incorrect_answers);
            });
            showQuestion();
        })
        .catch((error) => console.log("ERROR TO LOAD QUESTIONS", error));
}
