let panel = document.getElementById('panel');
let subjectTitle = document.getElementById('subjectTitle');
let subjectDiscription = document.getElementById('subjectDiscription');
let buttonStart = document.getElementById('buttonStart');
let buttons = document.getElementById('buttons');
let button1 = document.getElementById('button1');
let button2 = document.getElementById('button2');
let button3 = document.getElementById('button3');
let button4 = document.getElementById('button4');
let buttonCheckParties = document.getElementById('buttonCheckParties');
let terugButton = document.getElementById('terugButton');
let buttonAgain = document.getElementById('buttonAgain');
let checkPartiesBox = document.getElementById('checkPartiesBox');

let question = 0;
score = [];
answers = [];

for (let i = 0; i < parties.length; i++) {
    score[i] = {
        name: parties[i]['name'],
        score: 0,
        display: null,
    }
}

main();

function main() {
    answers = []
    setElementsNone();
    buttonStart.style.display = 'unset';
    subjectTitle.textContent = 'Start';
    buttonStart.onclick = function () {
        resetButtons();
        subjectTitle.textContent = subjects[question]['title'];
        subjectDiscription.textContent = subjects[question]['statement'];
        unsetElements();
        checkPartiesBox.style.display = 'none';
        buttonCheckParties.style.display = 'none';
        buttonCheckSubjects.style.display = 'none';
        buttonAgain.style.display = 'none';
        buttonStart.style.display = 'none';
    };

}
function setElementsNone(){
    checkPartiesBox.style.display = 'none';
    buttonCheckSubjects.style.display = 'none';
    buttonCheckParties.style.display = 'none';
    subjectDiscription.style.display = 'none';
    buttons.style.display = 'none';
    terugButton.style.display = 'none';
    buttonAgain.style.display = 'none';
    buttonCheckParties.style.display = 'none';
}
function unsetElements(){
    checkPartiesBox.style.display = 'unset';
    buttonCheckSubjects.style.display = 'unset';
    buttonCheckParties.style.display = 'unset';
    subjectDiscription.style.display = 'unset';
    buttons.style.display = 'unset';
    terugButton.style.display = 'unset';
    buttonAgain.style.display = 'unset';
    buttonCheckParties.style.display = 'unset';
}

function resetButtons() {
    button1.className = 'btn btn-outline-primary'
    button2.className = 'btn btn-outline-primary'
    button3.className = 'btn btn-outline-primary'
}

function buttonKeepColor() {
    if (answers[question] == 'pro') {
        resetButtons();
        button1.className = 'btn btn-primary'
    } else if (answers[question] == 'none') {
        resetButtons();
        button2.className = 'btn btn-primary'
    } else if (answers[question] == 'contra') {
        resetButtons();
        button3.className = 'btn btn-primary'
    } else if (answers[question] == 'Geen Antwoord') {
        resetButtons();
    }
}

function buttonTerug() {
    if (question != 0) {
        question--;
        buttonKeepColor();
        subjectTitle.textContent = subjects[question]['title'];
        subjectDiscription.textContent = subjects[question]['statement'];
        unsetElements();
  
        buttonCheckSubjects.style.display = 'none';
        buttonCheckParties.style.display = 'none';
        buttonAgain.style.display = 'none';
        buttonCheckParties.style.display = 'none';
        checkPartiesBox.style.display = 'none';
        buttonCheckParties.style.display = 'none';
    } else if (question == 0) {
        main();
    };
};

function myAnswer(antwoord) {
    resetButtons();
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
        for (let i = 0; i < parties.length; i++) {
            if (answers[m] == subjects[m]['parties'][i]['position']) {
                for (let p = 0; p < score.length; p++) {
                    if (subjects[m]['parties'][i]['name'] == score[p]['name']) {
                        score[p]['score'] = score[p]['score'] + 100 / subjects.length;
                    };
                };
            };
        };
    };
    subjectTitle.textContent = 'Welke partij wil je meenemen in je resultaat?';
    unsetElements();
    buttonAgain.style.display = 'none';
    buttonCheckSubjects.style.display = 'none';
    subjectDiscription.style.display = 'none';
    buttons.style.display = 'none';

    for (let g = 0; g < parties.length; g++) {
        var checkList = document.createElement('div');
        checkList.innerHTML = '<input type="checkbox" id=' + parties[g]['name'] + ' name=' + parties[g]['name'] + '><label for=' + parties[g]['name'] + '>' + parties[g]['name']; + '</label>';
        document.getElementById('checkPartiesBox').appendChild(checkList);

    }
}

function checkParties() {
    for (let d = 0; d < score.length; d++) {
        var checkbox = document.getElementById(score[d]['name']);
        if (checkbox.checked == true) {
            score[d]['display'] = true;
        } else {
            score[d]['display'] = false;
        };
    };
    result();
};

function result() {
    subjectTitle.textContent = 'Resultaat';
    setElementsNone();
    buttonAgain.style.display = 'unset';
    for (let d = 0; d < score.length; d++) {
        var highestScore = score.sort((a, b) => {
            return b.score - a.score;
        });
        if (score[d]['display'] == true) {
            var list = document.createElement('LI');
            var partiesList = document.createTextNode(score[d]['name'] + ': ' + score[d]['score'].toFixed(2) + '%');
            list.appendChild(partiesList);
            document.getElementById('score').appendChild(list);
        }
    }
}