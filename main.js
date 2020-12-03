var panel = document.getElementById('panel')
var subjectTitle = document.getElementById('subjectTitle');
var subjectDiscription = document.getElementById('subjectDiscription');
var buttonStart = document.getElementById('buttonStart')
var buttons = document.getElementById('buttons')
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
var button4 = document.getElementById('button4');
var buttonCheckParties = document.getElementById('buttonCheckParties');
var terugButton = document.getElementById('terugButton');
var opnieuw = document.getElementById('opnieuw');

var question = 0;
score = [];
answers = [];

function unsetElements() {
    subjectTitle.style.display = 'unset';
    subjectDiscription.style.display = 'unset';
    buttons.style.display = 'unset';
    terugButton.style.display = 'unset';
    buttonCheckParties.style.display = 'unset';
    checkParties.style.display = 'unset';
}

//start fucntion that shows the start button
start();

for (let i = 0; i < parties.length; i++) {
    score[i] = {
        name: parties[i]['name'],
        score: 0,
        display: null,
    }
}

// for (let i = 0; i < parties.length; i++) {
//     if (parties[i]['size'] >= 10) {
//         console.log(parties[i]['name']);
//         score[i]['display'] = true;
//     }
// }

//the start function sets display to none if you press the start it will unset
function start() {
    answers = []
    buttonStart.style.display = 'unset';
    checkParties.style.display = 'none';
    buttonCheckSubjects.style.display = 'none';
    buttonCheckParties.style.display = 'none';
    subjectTitle.textContent = 'Start';
    subjectDiscription.style.display = 'none';
    buttons.style.display = 'none';
    terugButton.style.display = 'none';
    opnieuw.style.display = 'none';
    buttonCheckParties.style.display = 'none';
    buttonStart.onclick = function () {
        resetButtons();
        subjectTitle.textContent = subjects[question]['title'];
        subjectDiscription.textContent = subjects[question]['statement'];
        unsetElements();
        buttonCheckParties.style.display = 'none';
        buttonStart.style.display = 'none';
    };
}
terugButton.onclick = function () {
    buttonTerug();
};
button1.onclick = function () {
    resetButtons();
    myAnswer('pro');
};
button2.onclick = function () {
    resetButtons();
    myAnswer('none');
};
button3.onclick = function () {
    resetButtons();
    myAnswer('contra');
};
button4.onclick = function () {
    resetButtons();
    myAnswer('Geen Antwoord');
};
buttonCheckParties.onclick = function () {
    for (let d = 0; d < score.length; d++) {
        var checkbox = document.getElementById(score[d]['name']);
        if (checkbox.checked == true) {
            console.log(score[d]['name']);
            score[d]['display'] = true;
        } else {
            console.log(score[d]['name'] + ' ' + false);
            score[d]['display'] = false;
        }
    }
    result();
    // checkSubjects();
};
buttonCheckSubjects.onclick = function () {
    for (let d = 0; d < subjects.length; d++) {
        var checkboxSubjects = document.getElementById(subjects[d]['title']);
        if (checkboxSubjects.checked == true) {
            console.log(subjects[d]['title'] + ' ' + true);
        } else {
            console.log(subjects[d]['title'] + ' ' + false);
        }
    }
};
opnieuw.onclick = function () {
    window.location.reload();
};

function resetButtons() {
    button1.className = 'btn btn-outline-primary'
    button2.className = 'btn btn-outline-primary'
    button3.className = 'btn btn-outline-primary'
}

//If you use the back button and choose another answer, your answers previous/next will be stored.
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

//back button, if you press back at the first question it will go back to the start
function buttonTerug() {
    if (question != 0) {
        question--;
        buttonKeepColor();
        subjectTitle.textContent = subjects[question]['title'];
        subjectDiscription.textContent = subjects[question]['statement'];
        unsetElements();
        checkParties.style.display = 'none';
        buttonCheckParties.style.display = 'none';
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
    subjectTitle.textContent = 'Welke partij wil je meenemen in je resultaat?';
    unsetElements();
    subjectDiscription.style.display = 'none';
    buttons.style.display = 'none';

    for (let g = 0; g < parties.length; g++) {
        var node = document.createElement('div');
        node.innerHTML = '<input type="checkbox" id=' + parties[g]['name'] + ' name=' + parties[g]['name'] + '><label for=' + parties[g]['name'] + '>' + parties[g]['name']; + '</label>';
        document.getElementById('checkParties').appendChild(node);

    }
}

function checkSubjects() {
    buttonCheckParties.style.display = 'none';
    buttonCheckSubjects.style.display = 'unset';
    subjectTitle.textContent = 'Welke onderwerp vindt u belangrijk?';
    checkParties.style.display = 'none';
    for (let y = 0; y < subjects.length; y++) {
        var node = document.createElement('div');
        node.innerHTML = '<input type="checkbox" id=' + subjects[y]['title'] + '><label for=' + subjects[y]['title'] + '>' + subjects[y]['title']; + '</label>';
        document.getElementById('checkSubjects').appendChild(node);
    }

}

function result() {
    subjectTitle.textContent = 'Resultaat';
    checkParties.style.display = 'none';
    buttonCheckSubjects.style.display = 'none';
    buttonCheckParties.style.display = 'none';
    subjectDiscription.style.display = 'none';
    terugButton.style.display = 'none';
    buttons.style.display = 'none';
    opnieuw.style.display = 'unset';
    var highestScore = score.sort((a, b) => {
        return b.score - a.score;
    });
    for (let d = 0; d < score.length; d++) {
        if (score[d]['display'] == true) {
            var list = document.createElement('LI');
            var partiesList = document.createTextNode(score[d]['name'] + ': ' + score[d]['score'].toFixed(2) + '%');
            list.appendChild(partiesList);
            document.getElementById('score').appendChild(list);
        }
    }
}