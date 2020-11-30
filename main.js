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


var question = 0;
score = [];
//all the answers are stored in the answer array
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
    resetButtons();
    subjectTitle.textContent = subjects[question]['title'];
    subjectTitle.textContent = 'start';
    subjectDiscription.style.display = 'none';
    buttons.style.display = 'none';
    terugButton.style.display = 'none';
    opnieuw.style.display = 'none';
    buttonStart.style.display = 'unset';

    buttonStart.onclick = function () {
        subjectTitle.textContent = subjects[question]['title'];
        terugButton.style.display = 'unset';
        buttons.style.display = 'unset';
        subjectTitle.style.display = 'unset';
        subjectDiscription.style.display = 'unset';
        buttonStart.style.display = 'none';
        subjectDiscription.textContent = subjects[question]['statement'];

    };
}

function resetButtons() {
    button1.className = 'btn btn-outline-primary'
    button2.className = 'btn btn-outline-primary'
    button3.className = 'btn btn-outline-primary'
}

button1.onclick = function () {
    myAnswer('pro');
    resetButtons();
};
button2.onclick = function () {
    myAnswer('none');
    resetButtons();
};
button3.onclick = function () {
    myAnswer('contra');
    resetButtons();
};
opnieuw.onclick = function () {
    window.location.reload();
};

function buttonTerug() {
    //back button if you press back at question 1 it will go back to the start
    if (question != 0) {
        question--;
        resetButtons();
        if (answers[question] == 'pro') {
            button1.className = 'btn btn-primary'
        } else if (answers[question] == 'none') {
            button2.className = 'btn btn-primary'
        } else if (answers[question] == 'contra') {
            button3.className = 'btn btn-primary'
        }
        subjectTitle.textContent = subjects[question]['title'];
        subjectDiscription.textContent = subjects[question]['statement'];
    } else if (question == 0) {
        start();
    }

}

function myAnswer(antwoord) {
    answers[question] = antwoord;
    question++;
    if (question != subjects.length) {
        subjectTitle.textContent = subjects[question]['title'];
        subjectDiscription.textContent = subjects[question]['statement'];
    } else if (question == subjects.length) {
        match();
    }
}

function match() {
    for (let m = 0; m < subjects.length; m++) {
        for (let i = 0; i < parties.length; i++) {
            if (answers[m] == subjects[m]['parties'][i]['position']) {
                for (let p = 0; p < score.length; p++) {
                    if (subjects[m]['parties'][i]['name'] == score[p]['name']) {
                        score[p]['score'] = score[p]['score'] + 100 / subjects.length;
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
    var highestScore = score.sort((a, b) => {
        return b.score - a.score;
    });
    for (let d = 0; d < 3; d++) {
        var list = document.createElement("LI");
        var partiesList = document.createTextNode(highestScore[d]['name'] + ' ' + highestScore[d]['score'].toFixed(2) + '%');
        list.appendChild(partiesList);
        document.getElementById("score").appendChild(list);
    }
}