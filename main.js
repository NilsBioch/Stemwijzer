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
answers = [];

for (let i = 0; i < parties.length; i++) {
    score[i] = {
        name: parties[i]['name'],
        score: 0
    }
}

subjectTitle.textContent = subjects[question]['title'];
subjectTitle.textContent = 'start';
subjectDiscription.style.display = 'none';
buttons.style.display = 'none';
terugButton.style.display = 'none';
opnieuw.style.display = 'none';

button1.onclick = function () {
    myAnswer('pro');
};
button2.onclick = function () {
    myAnswer('none');
};
button3.onclick = function () {
    myAnswer('contra');
};
opnieuw.onclick = function () {
    window.location.reload();
};
buttonStart.onclick = function () {
    subjectTitle.textContent = subjects[question]['title'];
    terugButton.style.display = 'unset';
    buttons.style.display = 'unset';
    subjectTitle.style.display = 'unset';
    subjectDiscription.style.display = 'unset';
    buttonStart.style.display = 'none';
    subjectDiscription.textContent = subjects[question]['statement'];

};

function buttonTerug() {
    if (question != 0) {
        question--;
        subjectTitle.textContent = subjects[question]['title'];
        subjectDiscription.textContent = subjects[question]['statement'];
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