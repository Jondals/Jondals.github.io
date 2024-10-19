var xmlDoc;
var currentQuestion = 0;
var totalQuestions = 0;
var userResponses = [];
var actualtheme;
var isReviewMode = false; 
var roullete_theme = document.getElementById("roullete_theme");
var backgroundMusic = document.getElementById("backgroundMusic");
var backgroundQuiz = document.getElementById("backgroundQuiz");
backgroundMusic.volume = 1.0;
backgroundQuiz.volume = 1.0;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const themeBackgroundColors = 
{
    "theme1": "#FFFAF0",
    "theme2": "#FFF7D6",
    "theme3": "#E3F2FD",
    "theme4": "#E0F7FA",
    "theme5": "#E8F5E9",
    "theme6": "#FFE0B2",
    "theme7": "#FCE4EC",
    "theme8": "#E3F2FD"
};

document.getElementById("btn1").hidden = true;
document.getElementById("btn2").hidden = true;
document.getElementById("btn3").hidden = true;
document.getElementById("btn4").hidden = true;
document.getElementById("head").hidden = true;
document.getElementById("choose").hidden = true;
document.getElementById("results").hidden = true;
document.getElementById("review").hidden = true;
document.getElementById("general").hidden = true;
document.getElementById("roulette-container").hidden = true;

function cargarXML(tema) 
{
    var xmlFile;
    var themeClass;
    switch (tema) 
    {
        case "Tema 1: Al azar":
            xmlFile = "questions_Aleatorios.xml";
            themeClass = "theme1";
            document.getElementById("general").style.backgroundColor = "#FFFAF0";
            break;

        case "Tema 2: Historia":
            xmlFile = "questions_Historia.xml";
            themeClass = "theme2";
            document.getElementById("general").style.backgroundColor = "#FFF7D6";
            break;

        case "Tema 3: Ciencia":
            xmlFile = "questions_Ciencia.xml";
            themeClass = "theme3";
            document.getElementById("general").style.backgroundColor = "#E3F2FD";
            break;

        case "Tema 4: Mecanica":
            xmlFile = "questions_Mecanica.xml";
            themeClass = "theme4";
            document.getElementById("general").style.backgroundColor = "#E0F7FA";
            break;

        case "Tema 5: Geografia":
            xmlFile = "questions_Geografia.xml";
            themeClass = "theme5";
            document.getElementById("general").style.backgroundColor = "#E8F5E9";
            break;

        case "Tema 6: Programacion":
            xmlFile = "questions_Programacion.xml";
            themeClass = "theme6";
            document.getElementById("general").style.backgroundColor = "#FFE0B2";
            break;

        case "Tema 7: Comida":
            xmlFile = "questions_Comida.xml";
            themeClass = "theme7";
            document.getElementById("general").style.backgroundColor = "#FCE4EC";
            break;

        case "Tema 8: Deportes":
            xmlFile = "questions_Deportes.xml";
            themeClass = "theme8";
            document.getElementById("general").style.backgroundColor = "#E3F2FD";
            break;
    }

    actualtheme = themeClass;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            xmlDoc = this.responseXML;
            totalQuestions = xmlDoc.getElementsByTagName("Pregunta").length;
            showQuestion(currentQuestion);

            resetButtonStyles(themeClass);

            document.getElementById("btn1").hidden = false;
            document.getElementById("btn2").hidden = false;
            document.getElementById("btn3").hidden = false;
            document.getElementById("btn4").hidden = false;
            document.getElementById("head").hidden = false;
            document.getElementById("choose").hidden = false;

            document.getElementById("roulette-container").hidden = true;
            document.getElementById("head").hidden = false;
            document.getElementById("choose").hidden = false;

            document.getElementById('verify').hidden = true;
            document.getElementById("start_logo").hidden = true;
            document.getElementById("text_logo").hidden = true;
        }
    };
    xhttp.open("GET", xmlFile, true);
    xhttp.send();
}

function showRoulette() 
{
    document.getElementById('verify').hidden = true;
    document.getElementById("roulette-container").hidden = false;
    document.getElementById("general").hidden = false;
    backgroundMusic.play();
}

function roulette() 
{
    roullete_theme.style.color = "#e1d7c0";
    document.getElementById("spin_roullete").disabled = true;

    var totalRotations = Math.floor(Math.random() * 3000) + 800;

    //360 = 8 sectores * 45 grados cada sector
    var finalRotation = totalRotations % 360;

    //+270 siempre selecciona el sector inferior a la flecha
    var adjustedRotation = (finalRotation + 270) % 360;

    //ajuste de sectores para que sea mas exacto, cada uno 45º
    var sector;
    if (adjustedRotation >= 337.5 || adjustedRotation < 22.5)
    {
        sector = 0;
    } 
    else if (adjustedRotation >= 22.5 && adjustedRotation < 67.5) 
    {
        sector = 1;
    }
    else if (adjustedRotation >= 67.5 && adjustedRotation < 112.5) 
    {
        sector = 2;
    }
    else if (adjustedRotation >= 112.5 && adjustedRotation < 157.5) 
    {
        sector = 3;
    } 
    else if (adjustedRotation >= 157.5 && adjustedRotation < 202.5) 
    {
        sector = 4;
    }
    else if (adjustedRotation >= 202.5 && adjustedRotation < 247.5) 
    {
        sector = 5;
    }
    else if (adjustedRotation >= 247.5 && adjustedRotation < 292.5) 
    {
        sector = 6;
    } 
    else if (adjustedRotation >= 292.5 && adjustedRotation < 337.5) 
    {
        sector = 7;
    }

    //asignar temas
    var iconThemes = 
    [
        "Tema 1: Al azar",         
        "Tema 2: Historia",       
        "Tema 3: Ciencia",           
        "Tema 4: Mecanica",        
        "Tema 5: Geografia", 
        "Tema 6: Programacion",       
        "Tema 7: Comida",         
        "Tema 8: Deportes"        
    ];

    var temaSeleccionado = iconThemes[sector];

    var rouletteImage = document.getElementById("roulette-img");

    rouletteImage.style.transition = "transform 4s ease-in-out";
    rouletteImage.style.transform = "rotate(" + totalRotations + "deg)";

    
    setTimeout(function() 
    {
        if(roullete_theme)
        {
            roullete_theme.innerHTML = temaSeleccionado;
            roullete_theme.style.color = "black";
        }

        setTimeout(function()
        {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            document.getElementById("spin_roullete").disabled = false;
            cargarXML(temaSeleccionado);
        },1500);
        
        
    }, 4000);//4s
}

function showQuestion(index)
{
    var questions = xmlDoc.getElementsByTagName("Pregunta");
    var actualQuestion = questions[index];
    backgroundQuiz.play();
    
    //titulo
    var questionTitle = actualQuestion.getElementsByTagName("Titulo")[0].childNodes[0].nodeValue;
    document.getElementById("question_HTML").innerHTML = '<h3>' + questionTitle + '</h3>';

    //respuestas
    var answers = actualQuestion.getElementsByTagName("Respuesta");

    //recorre respuestas asignando texto a botones
    for (var i = 0; i < answers.length; i++) 
    {
        var answerText = answers[i].childNodes[0].nodeValue;
        var isCorrect = answers[i].getAttribute("correcta") === "true";

        var button = document.getElementById("btn" + (i + 1));
        button.innerHTML = answerText;

        if (isReviewMode) //si esta en modo edicion (boton final revisar)
        {
            //pone todos los botones disabled
            button.disabled = true;
            
            //obtiene los resultados
            var userResponse = userResponses[index]; 

            if (userResponse && userResponse.selectedOptionIndex === i) //seleccionado haciendo el cuestionario
            {
                if(isCorrect)
                {
                    button.classList.add("btn-success");
                    button.classList.remove("btn-primary", "btn-danger");
                } 
                else 
                {
                    button.classList.add("btn-danger");
                    button.classList.remove("btn-primary", "btn-success");
                }
            } 

            else if(isCorrect) 
            {
                if (userResponse && userResponse.isCorrect === false) //no seleccionado haciendo el cuestionario
                {
                    button.classList.add("btn-success");
                    button.classList.remove("btn-primary", "btn-danger");
                }
                else
                {
                    button.classList.remove("btn-success", "btn-danger");
                    button.classList.add("btn-primary");
                }
            }
            else 
            {
                button.classList.remove("btn-success", "btn-danger");
                button.classList.add("btn-primary");
            }
        }

        else //modo normal
        {
            button.disabled = false;

            button.onclick =  (function(optionIndex, correctValue) 
            {
                return async function() 
                {
                    seleccionarRespuesta(optionIndex, correctValue, this);
                    await delay(1000);
                    entregarCuestionario();

                    if (currentQuestion < totalQuestions - 1) 
                    {
                        nextQuestion();
                    }
                };
            })(i, isCorrect);

            button.classList.remove("btn-success", "btn-danger");
            button.classList.add("btn-primary");
        }
    }
}

function seleccionarRespuesta(selectedOptionIndex, isCorrect, buttonElement) 
{
    document.getElementById("btn1").disabled = true;
    document.getElementById("btn2").disabled = true;
    document.getElementById("btn3").disabled = true;
    document.getElementById("btn4").disabled = true;

    //si es correcta la guarda en userResponses
    userResponses[currentQuestion] = 
    {
        selectedOptionIndex: selectedOptionIndex,
        isCorrect: isCorrect
    };

    //si es correcta o no se aplican los estilos succes o danger
    if (isCorrect) 
    {
        buttonElement.classList.add("btn-success");
        buttonElement.classList.remove("btn-primary", "btn-danger");
    } 
    else 
    {
        buttonElement.classList.add("btn-danger");
        buttonElement.classList.remove("btn-primary", "btn-success");
        mostrarRespuestaCorrecta();
    }
}

function mostrarRespuestaCorrecta() 
{
    var questions = xmlDoc.getElementsByTagName("Pregunta");
    var actualQuestion = questions[currentQuestion];
    var answers = actualQuestion.getElementsByTagName("Respuesta");

    for (var i = 0; i < answers.length; i++) 
    {
        var isCorrect = answers[i].getAttribute("correcta") === "true";

        if (isCorrect) 
        {
            var correctButton = document.getElementById("btn" + (i + 1));
            correctButton.classList.add("btn-success");
            correctButton.classList.remove("btn-primary", "btn-danger");
        }
    }
}

function entregarCuestionario() 
{
    var correctAnswers = 0;
    var incorrectAnswers = 0;

    for (var i = 0; i < totalQuestions; i++) 
    {
        if (userResponses[i] && userResponses[i].isCorrect === true) 
        {
            correctAnswers++;
        } 

        else if (userResponses[i] && userResponses[i].isCorrect === false)
        {
            incorrectAnswers++;
        }

        else //si no se responde es incorrecto
        {
            incorrectAnswers++;
        }
    }

    //mostrar respuestas
    if(currentQuestion == totalQuestions - 1)
    {
        document.getElementById("head").hidden = true;
        document.getElementById("choose").hidden = true;
        document.getElementById("results").hidden = false;
        document.getElementById("general").style.backgroundColor = "#27283f";
        document.getElementById("check").innerHTML = "<p>Respuestas correctas: " + correctAnswers + "</p>" + "<p>Respuestas incorrectas: " + incorrectAnswers + "</p>";
    }
}

function nextQuestion() //automatica
{
    if (currentQuestion < totalQuestions - 1) 
    {
        currentQuestion++;
        resetButtons();
        showQuestion(currentQuestion);
    }
}

function nextReviewQuestion() //boton
{
    if (currentQuestion < totalQuestions - 1) 
    {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function backReviewQuestion() //boton
{
    if (currentQuestion > 0) 
    {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function resetButtons() 
{
    document.getElementById("btn1").disabled = false;
    document.getElementById("btn2").disabled = false;
    document.getElementById("btn3").disabled = false;
    document.getElementById("btn4").disabled = false;

    document.getElementById("btn1").classList.remove("btn-success", "btn-danger");
    document.getElementById("btn2").classList.remove("btn-success", "btn-danger");
    document.getElementById("btn3").classList.remove("btn-success", "btn-danger");
    document.getElementById("btn4").classList.remove("btn-success", "btn-danger");

    document.getElementById("btn1").classList.add("btn-primary");
    document.getElementById("btn2").classList.add("btn-primary");
    document.getElementById("btn3").classList.add("btn-primary");
    document.getElementById("btn4").classList.add("btn-primary");
}

function resetButtonStyles(themeClass) 
{ 
    document.getElementById("btn1").className = "btn-primary";
    document.getElementById("btn2").className = "btn-primary";
    document.getElementById("btn3").className = "btn-primary";
    document.getElementById("btn4").className = "btn-primary";

    document.getElementById("btn1").classList.add(themeClass);
    document.getElementById("btn2").classList.add(themeClass);
    document.getElementById("btn3").classList.add(themeClass);
    document.getElementById("btn4").classList.add(themeClass);
}

function reload() 
{
    currentQuestion = 0;
    userResponses = [];
    roullete_theme.style.color = "#e1d7c0";

    document.getElementById("check").innerHTML = '';

    document.getElementById("general").style.backgroundColor = "#e1d7c0";

    document.getElementById("roulette-container").hidden = false;
    document.getElementById("spin_roullete").hidden = false;
    document.getElementById("results").hidden = true;
    document.getElementById("review").hidden = true;

    document.getElementById("head").hidden = true;
    document.getElementById("choose").hidden = true;
    document.getElementById("btn1").hidden = true;
    document.getElementById("btn2").hidden = true;
    document.getElementById("btn3").hidden = true;
    document.getElementById("btn4").hidden = true;

    resetButtons();

    document.getElementById("spin_roullete").disabled = false;
}

function showAgain() 
{
    isReviewMode = true;
    currentQuestion = 0;

    //color del fondo
    if (actualtheme in themeBackgroundColors) 
    {
        document.getElementById("general").style.backgroundColor = themeBackgroundColors[actualtheme];
    }

    document.getElementById("head").hidden = false;
    document.getElementById("choose").hidden = false;
    document.getElementById("review").hidden = false;
    document.getElementById("results").hidden = true;

    document.getElementById("nextReviewButton").hidden = false;
    document.getElementById("backReviewButton").hidden = false;

    showQuestion(currentQuestion); 
}
