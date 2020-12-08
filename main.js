//const
const alert = document.getElementById('alert');
const panel = document.getElementById('panel');
const btn = document.getElementsByClassName('btn');  
const subjectTitle = document.getElementById('subjectTitle');
const subjectDiscription = document.getElementById('subjectDiscription');
const buttonStart = document.getElementById('buttonStart');
const buttons = document.getElementById('buttons');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const terugButton = document.getElementById('terugButton');
const buttonAgain = document.getElementById('buttonAgain');
const checkPartiesBox = document.getElementById('checkPartiesBox');
const buttonCheckParties = document.getElementById('buttonCheckParties');
const afterQuestionButtons = document.getElementById('afterQuestionButtons');

const buttonOutline = 'btn btn-outline-primary';
const buttonPrimary = 'btn btn-primary'
const minimumCheckedParties = 3;

var question = 0;
var scores = [];
var answers = [];
var questions = [];

//makes partie object with partie information
for (let i = 0; i < parties.length; i++) {
    scores[i] = {
        name: parties[i].name,
        score: 0,
        display: false,
    }
}
//makes questions object with questions information
for (let i = 0; i < subjects.length; i++) {
    questions[i] = {
        name: subjects[i].title,
        important: false,
    }
}

main();
//groeperen elements, hergebruik
function main() {
    answers = []
    setElementsNone();
    buttonStart.style.display = 'unset';
    subjectTitle.textContent = 'Start';
    buttonStart.onclick = function () {
        resetButtons();
        updateSubject();
        unsetElements();

        checkPartiesBox.style.display = 'none';
        afterQuestionButtons.style.display = 'none';
        buttonAgain.style.display = 'none';
        buttonStart.style.display = 'none';
        
    };
}
function updateSubject() {
    subjectTitle.textContent = subjects[question].title;
    subjectDiscription.textContent = subjects[question].statement;
}
function setElementsNone() {
    buttons.style.display = 'none';
    alert.style.display = 'none';
    afterQuestionButtons.style.display = 'none';
    checkPartiesBox.style.display = 'none';
    subjectDiscription.style.display = 'none';
    terugButton.style.display = 'none';
}

function unsetElements() {
    buttons.style.display = 'unset';
    afterQuestionButtons.style.display = 'unset';
    checkPartiesBox.style.display = 'unset';
    buttonCheckSubjects.style.display = 'unset';
    buttonCheckParties.style.display = 'unset';
    subjectDiscription.style.display = 'unset';
    terugButton.style.display = 'unset';
}

function resetButtons() {
    button1.className = buttonOutline;
    button2.className = buttonOutline;
    button3.className = buttonOutline;
}

function buttonKeepColor() {
    resetButtons();
    if (answers[question] == 'pro') {
        button1.className = buttonPrimary;
    } else if (answers[question] == 'none') {
        button2.className = buttonPrimary;
    } else if (answers[question] == 'contra') {
        button3.className = buttonPrimary;
    } 
}

function buttonBack() {
    if (question != 0) {
        question--;
        buttonKeepColor();
        updateSubject();
        unsetElements();
        
        afterQuestionButtons.style.display = 'none';
        buttonAgain.style.display = 'none';
        checkPartiesBox.style.display = 'none';

    } else if (question == 0) {
        main();
    };
};
//questions in function
function myAnswer(antwoord) {
    resetButtons();
    answers[question] = antwoord;
    question++;
    buttonKeepColor();
    if (question != subjects.length) {
        updateSubject();
    } else if (question == subjects.length) {
        chooseSubjects();
    }
}

function chooseSubjects() {
    subjectTitle.textContent = 'Welk onderwerp vindt jij belangrijk?';
    unsetElements();

    buttonCheckParties.style.display = 'unset';
    buttonCheckSubjects.style.display = 'none';
    buttonBigParties.style.display = 'none';
    buttonAgain.style.display = 'none';

    buttons.style.display = 'none';

    subjectDiscription.style.display = 'none';

    for (let g = 0; g < subjects.length; g++) {
        var node = document.createElement('div');
        node.innerHTML = '<input type="checkbox" id= questions' + g + ' name= questions' + g + '><label for= questions' + g + '>' + subjects[g].title; + '</label>';
        document.getElementById('checkSubjectsBox').appendChild(node);
    };
};
//ternere expressie
//conditional expression
// [] = . 
function checkSubjects() {
    for (let d = 0; d < subjects.length; d++) {
        var checkbox = document.getElementById('questions' + d);
        questions[d].important = checkbox.checked;
    };
    chooseParties();
};

function chooseParties() {
    subjectTitle.textContent = 'Welke partij wil je meenemen in je resultaat?';
    unsetElements();


    buttonCheckSubjects.style.display = 'unset';
    buttonBigParties.style.display = 'unset';
    buttonCheckParties.style.display = 'none';
    buttonAgain.style.display = 'none';

    buttons.style.display = 'none';

    checkSubjectsBox.style.display = 'none';
    subjectDiscription.style.display = 'none';

    for (let g = 0; g < parties.length; g++) {
        var node = document.createElement('div');
        node.innerHTML = '<input type="checkbox" id=' + parties[g].name + ' name=' + parties[g].name + '><label for=' + parties[g].name + '>' + parties[g].name; + '</label>';
        document.getElementById('checkPartiesBox').appendChild(node);
    };
    buttonBigParties.onclick = function () {
        for (let a = 0; a < parties.length; a++) {
            var checkbox = document.getElementById(parties[a].name);
            checkbox.checked = parties[a].size >= 10;
        }
    }
};

function checkParties() {
    let checkedParties = 0;
    for (let d = 0; d < scores.length; d++) {
        var checkbox = document.getElementById(scores[d].name);
        if (checkbox.checked == true) {
            scores[d].display = true;
            checkedParties++;
        } else {
            scores[d].display = false;
        };
    };
    if (checkedParties < minimumCheckedParties) {
        alert.style.display = 'unset'
    } else {
        alert.style.display = 'none'
        match();
    }
};
//berekening, mdn array.find
function match() {
    for (let m = 0; m < subjects.length; m++) {
        for (let i = 0; i < subjects[m].parties.length; i++) {
            if (answers[m] == subjects[m].parties[i].position) {
                for (let p = 0; p < scores.length; p++) {
                    if (subjects[m].parties[i].name == scores[p].name) {
                        if (questions[m].important = true) {
                            scores[p].score = scores[p].score + 2 ;
                            console.log('important questions');
                        } else {
                            scores[p].score = scores[p].score + 1;
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
    var highestScore = scores.sort((a, b) => {
        return b.score - a.score;
    });
    for (let d = 0; d < scores.length; d++) {
        if (scores[d].display == true) {
            var list = document.createElement('LI');
            var partiesList = document.createTextNode(scores[d].name + ': ' + scores[d].score.toFixed(2));
            list.appendChild(partiesList);
            document.getElementById('score').appendChild(list);
        }
    }
}