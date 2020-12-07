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
subject = [];

for (let i = 0; i < parties.length; i++) {
    score[i] = {
        name: parties[i]['name'],
        score: 0,
        display: false,
    }
}

for (let i = 0; i < subjects.length; i++) {
    subject[i] = {
        name: subjects[i]['title'],
        important: false,
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

function setElementsNone() {
    buttonBigParties.style.display = 'none';
    checkPartiesBox.style.display = 'none';
    buttonCheckSubjects.style.display = 'none';
    buttonCheckParties.style.display = 'none';
    subjectDiscription.style.display = 'none';
    buttons.style.display = 'none';
    terugButton.style.display = 'none';
    buttonAgain.style.display = 'none';
    buttonCheckParties.style.display = 'none';
}

function unsetElements() {
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
        chooseSubjects();
    }
}

function chooseSubjects() {
    subjectTitle.textContent = 'Welk onderwerp vindt jij belangrijk?';
    unsetElements();
    buttonAgain.style.display = 'none';
    buttonCheckSubjects.style.display = 'none';
    subjectDiscription.style.display = 'none';
    buttons.style.display = 'none';
    for (let g = 0; g < subjects.length; g++) {
        var node = document.createElement('div');
        node.innerHTML = '<input type="checkbox" id= subject' + g + ' name= subject' + g + '><label for= subject' + g + '>' + subjects[g]['title']; + '</label>';
        document.getElementById('checkSubjectsBox').appendChild(node);
    };
};

function checkSubjects() {
    for (let d = 0; d < subjects.length; d++) {
        var checkbox = document.getElementById('subject' + d);
        if (checkbox.checked == true) {
            subject[d]['important'] = true;
        } else {
            subject[d]['important'] = false;
        };
    };
    chooseParties();
};

function chooseParties() {
    subjectTitle.textContent = 'Welke partij wil je meenemen in je resultaat?';
    unsetElements();
    buttonBigParties.style.display = 'unset';
    buttonCheckSubjects.style.display = 'unset';
    checkSubjectsBox.style.display = 'none';
    buttonCheckParties.style.display = 'none';
    buttonAgain.style.display = 'none';
    subjectDiscription.style.display = 'none';
    buttons.style.display = 'none';
    for (let g = 0; g < parties.length; g++) {
        var node = document.createElement('div');
        node.innerHTML = '<input type="checkbox" id=' + parties[g]['name'] + ' name=' + parties[g]['name'] + '><label for=' + parties[g]['name'] + '>' + parties[g]['name']; + '</label>';
        document.getElementById('checkPartiesBox').appendChild(node);
    };
    buttonBigParties.onclick = function () {
        for (let a = 0; a < parties.length; a++) {
            var checkbox = document.getElementById(parties[a]['name']);
            if (parties[a]['size'] >= 10) {
                checkbox.checked = true;
            }else{
                checkbox.checked = false;
            }
        }
    }
};

function checkParties() {
    for (let d = 0; d < score.length; d++) {
        var checkbox = document.getElementById(score[d]['name']);
        if (checkbox.checked == true) {
            score[d]['display'] = true;
        } else {
            score[d]['display'] = false;
        };
    };
    match();
};

function match() {
    for (let m = 0; m < subjects.length; m++) {
        for (let i = 0; i < parties.length - 1; i++) {
            if (answers[m] == subjects[m]['parties'][i]['position']) {
                for (let p = 0; p < score.length; p++) {
                    if (subjects[m]['parties'][i]['name'] == score[p]['name']) {
                        if (subject[m]['important'] = true) {
                            score[p]['score'] = score[p]['score'] + 120 / subjects.length;
                        } else {
                            score[p]['score'] = score[p]['score'] + 100 / subjects.length;
                        }
                    };
                };
            };
        };
    };
    result();
}

function result() {
    subjectTitle.textContent = 'Resultaat';
    setElementsNone();
    buttonAgain.style.display = 'unset';
    for (let d = 0; d < score.length; d++) {
        var highestScore = score.sort((a, b) => {
            return b.score - a.score;
        });
        if (score[d]['display'] == true) {
            if (score[d]['score'] > 100) {
                score[d]['score'] == 100;
            }
            var list = document.createElement('LI');
            var partiesList = document.createTextNode(score[d]['name'] + ': ' + score[d]['score'].toFixed(2) + '%');
            list.appendChild(partiesList);
            document.getElementById('score').appendChild(list);
        }
    }
}