var panel = document.getElementById('panel')
var subjectTitle = document.getElementById('subjectTitle');
var subjectDiscription = document.getElementById('subjectDiscription');
var buttonStart = document.getElementById('buttonStart')
var buttons = document.getElementById('buttons')
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
var terugButton = document.getElementById('terugButton');
var opnieuw = document.getElementById('opnieuw');

//variables an arrays for the answers and scores, and the question counter
var question = 0;
score = [];
answers = [];

for (let i = 0; i < parties.length; i++) {
    score[i] = {
        name: parties[i]['name'],
        score: 0
    }
}
//start fucntion that shows the start button
start();

//the start function sets display to none if you press the start it will unset
function start() {
    buttonStart.style.display = 'unset';
    subjectTitle.textContent = 'Start';
    subjectDiscription.style.display = 'none';
    buttons.style.display = 'none';
    terugButton.style.display = 'none';
    opnieuw.style.display = 'none';

    buttonStart.onclick = function () {
        resetButtons();
        buttonStart.style.display = 'none';
        subjectTitle.textContent = subjects[question]['title'];
        subjectTitle.style.display = 'unset';
        subjectDiscription.textContent = subjects[question]['statement'];
        subjectDiscription.style.display = 'unset';
        buttons.style.display = 'unset';
        terugButton.style.display = 'unset';

    };
}

button1.onclick = function () {
    myAnswer('pro');
};
button2.onclick = function () {
    myAnswer('none');
};
button3.onclick = function () {
    myAnswer('contra');
};
button4.onclick = function () {
    myAnswer('Geen Antwoord');
};
opnieuw.onclick = function () {
    window.location.reload();
};

function resetButtons() {
    answers = [];
    button1.className = 'btn btn-outline-primary'
    button2.className = 'btn btn-outline-primary'
    button3.className = 'btn btn-outline-primary'
}

//If you use the back button and choose another answer, your answers next will be stored.
function buttonKeepColor(){
    if (answers[question] == 'pro') {
        button1.className = 'btn btn-primary'
        button2.className = 'btn btn-outline-primary'
        button3.className = 'btn btn-outline-primary'
    } else if (answers[question] == 'none') {
        button2.className = 'btn btn-primary'
        button1.className = 'btn btn-outline-primary'
        button3.className = 'btn btn-outline-primary'
    } else if (answers[question] == 'contra') {
        button3.className = 'btn btn-primary'
        button1.className = 'btn btn-outline-primary'
        button2.className = 'btn btn-outline-primary'
    }
}

function buttonTerug() {
    //back button if you press back at the first question it will go back to the start
    if (question != 0) {
        question--;
        buttonKeepColor();
        subjectTitle.textContent = subjects[question]['title'];
        subjectDiscription.textContent = subjects[question]['statement'];
    } else if (question == 0) {
        start();
    }

}

//stores Answer in Answer Array and updates the question and title.
function myAnswer(antwoord) {
    answers[question] = antwoord;
    question++;
    buttonKeepColor();
    if (question != subjects.length) {
        subjectTitle.textContent = subjects[question]['title'];
        subjectDiscription.textContent = subjects[question]['statement'];
    } else if (question == subjects.length) {
        match();
    }
}

function match() {
    for (let m = 0; m < subjects.length; m++) {
        for (let i = 0; i < parties.length-1; i++) {
            if (answers[m] == subjects[m]['parties'][i]['position']) {
                for (let p = 0; p < score.length; p++) {
                    if (subjects[m]['parties'][i]['name'] == score[p]['name']) {
                        score[p]['score'] = score[p]['score'] + 1;
                        console.log(score[p]['name'] + ' ' + score[p]['score']);
                    }
                }
            }
        }
    }
    result();
}

function result() {
    subjectTitle.textContent = 'Resultaat';
    subjectDiscription.style.display = 'none';
    terugButton.style.display = 'none';
    buttons.style.display = 'none';
    opnieuw.style.display = 'unset';

    var VolledigeScore = 0;
    var highestScore = score.sort((a, b) => {
        return b.score - a.score;
    });
    for (let d = 0; d < 3; d++) {
        VolledigeScore = VolledigeScore + score[d]['score'];
    }
    for (let a = 0; a < score.length; a++) {
        score[a]['score'] = 100 / VolledigeScore * score[a]['score'];
        console.log(score[a]['score'] + '%');
        console.log(highestScore);
    }

    for (let d = 0; d < 3; d++) {
        var list = document.createElement("LI");
        var partiesList = document.createTextNode(highestScore[d]['name'] + ' ' + highestScore[d]['score'].toFixed(2) + '%');
        list.appendChild(partiesList);
        document.getElementById("score").appendChild(list);
    }
}