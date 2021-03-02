const minimumCheckedPartiesAlert = document.getElementById('minimumCheckedPartiesAlert');
const subjectTitle = document.getElementById('subjectTitle');
const subjectDiscription = document.getElementById('subjectDiscription');
const buttonStart = document.getElementById('buttonStart');
const backButton = document.getElementById('backButton');
const buttons = document.getElementById('buttons');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const buttonAgain = document.getElementById('buttonAgain');
const checkPartiesBox = document.getElementById('checkPartiesBox');
const buttonCheckSubjects = document.getElementById('buttonCheckSubjects');
const importantParties = document.getElementById('importantParties');
const buttonOutline = 'btn btn-outline-primary';
const buttonPrimary = 'btn btn-primary'
const minimumCheckedParties = 3;
const minimumPartieSize = 10;

/** filters if there are duplicates */

var uniqueParties = 
    // store the comparison  values in array
    parties.map(e => e['name'])
    // store the indexes of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    //deletes the duplicates and returns te unique 
    .filter(obj => parties[obj]).map(e => parties[e]);

/** keeps track of wich question you are at */
var question = 0;
/** saves score in this object */
var scores = [];
/** saves your answers */
var answers = [];
/** Saves if the question is important to add a bonus point */
var questions = [];

/** makes partie object with partie information */
for (let i = 0; i < parties.length; i++) {
    scores[i] = {
        name: parties[i].name,
        score: 0,
        display: false,
    };
};

/** makes questions object with questions information */
for (let o = 0; o < subjects.length; o++) {
    questions[o] = {
        name: subjects[o].title,
        important: false,
    };
};

main();

/** Start function, will set display to starting stage */
function main() {
    answers = [];
    question = 0;
    subjectTitle.textContent = 'Start';
    buttonStart.style.display = 'unset';
    setElement('none');
    minimumCheckedPartiesAlert.style.display = 'none';
    buttonAgain.style.display = 'none';
    buttonStart.onclick = function () {
        resetButtons();
        updateSubject();
        setElement('unset');
        importantParties.style.display = 'none';
        buttonCheckSubjects.style.display = 'none';
        checkPartiesBox.style.display = 'none';
        buttonAgain.style.display = 'none';
        buttonStart.style.display = 'none';
    };
};


//Updates the title and discription
function updateSubject() {
    subjectTitle.textContent = subjects[question].title;
    subjectDiscription.textContent = subjects[question].statement;
};


/**
 * Sets display to the parameter
 * 
 * @param {string} displaySetting - Sets display to 'unset' or 'none'
 */
function setElement(displaySetting) {
    buttons.style.display = displaySetting;
    checkPartiesBox.style.display = displaySetting;
    buttonCheckSubjects.style.display = displaySetting;
    importantParties.style.display = displaySetting;
    subjectDiscription.style.display = displaySetting;
    backButton.style.display = displaySetting;
};

/** Gives button class='btn btn-outline-primary' */
function resetButtons() {
    button1.className = buttonOutline;
    button2.className = buttonOutline;
    button3.className = buttonOutline;
};

/** Keeps color if you go back and fort through questions */
function buttonKeepColor() {
    resetButtons();
    if (answers[question] == 'pro') {
        button1.className = buttonPrimary;
    } else if (answers[question] == 'none') {
        button2.className = buttonPrimary;
    } else if (answers[question] == 'contra') {
        button3.className = buttonPrimary;
    };
};

/** Go back 1 question, it will show the right stuff */
function buttonBack() {
    if (question != 0) {
        question--;
        buttonKeepColor();
        updateSubject();
        setElement('unset');
        importantParties.style.display = 'none';
        buttonCheckSubjects.style.display = 'none';
    } else if (question == 0) {
        main();
    };
};


/**
 * Stores answer in answer array, if you are at the end of the questions it will go to ChooseSubjects
 * 
 * @param {string} yourAnswer - Your answer to the questions
 */
function myAnswer(yourAnswer) {
    resetButtons();
    answers[question] = yourAnswer;
    question++;
    buttonKeepColor();
    if (question != questions.length) {
        updateSubject();
    } else if (question == questions.length) {
        chooseSubjects();
    };
};

/** Makes checkboxes for every subject */
function chooseSubjects() {
    subjectTitle.textContent = 'Welk onderwerp vindt jij belangrijk?';
    setElement('unset');
    importantParties.style.display = 'none';
    backButton.style.display = 'none';
    buttons.style.display = 'none';
    subjectDiscription.style.display = 'none';
    for (let g = 0; g < questions.length; g++) {
        var node = document.createElement('div');
        node.innerHTML = '<input type="checkbox" id="' + questions[g].name + '"name="' + questions[g].name + '"><label for="' + questions[g].name + '">' + questions[g].name + '</label>';
        document.getElementById('checkSubjectsBox').appendChild(node);
    };
};

/** If you press 'Ga Door' it will check if a checkbox is checked */
function checkSubjects() {
    for (let d = 0; d < questions.length; d++) {
        var checkbox = document.getElementById(questions[d].name);
        questions[d].important = checkbox.checked;
    };
    chooseParties();
};

/** Makes checkboxes for every partie you want to see in your result */
function chooseParties() {
    subjectTitle.textContent = 'Welke partij wil je meenemen in je resultaat?';
    setElement('unset');
    buttonCheckSubjects.style.display = 'none';
    backButton.style.display = 'none';
    buttonAgain.style.display = 'none';
    buttons.style.display = 'none';
    checkSubjectsBox.style.display = 'none';
    subjectDiscription.style.display = 'none';
    for (let g = 0; g < scores.length; g++) {
        var node = document.createElement('div');
        node.innerHTML = '<input type="checkbox" id="' + scores[g].name + '" name="' + scores[g].name + '"><label for="' + scores[g].name + '">' + scores[g].name + '</label>';
        document.getElementById('checkPartiesBox').appendChild(node);
    };
    buttonBigParties.onclick = function () {
        for (let a = 0; a < uniqueParties.length; a++) {
            var checkbox = document.getElementById(uniqueParties[a].name);
            checkbox.checked = uniqueParties[a].size >= minimumPartieSize;
        };
    };
    buttonSecParties.onclick = function () {
        for (let a = 0; a < uniqueParties.length; a++) {
            var checkbox = document.getElementById(scores[a].name);
            checkbox.checked = uniqueParties[a].secular == true;
        };
    };
};

/** 
 * If you press 'Ga naar resultaat' it will check if a checkbox is checked, 
 * and if you press 'Alleen grote partijen' it will check every partie wich size is bigger than 10 
 */
function checkParties() {
    let checkedParties = 0;
    for (let d = 0; d < scores.length; d++) {
        var checkbox = document.getElementById(scores[d].name);
        if (checkbox.checked) {
            scores[d].display = true;
            checkedParties++;
        } else {
            scores[d].display = false;
        };
    };
    if (checkedParties < minimumCheckedParties) {
        minimumCheckedPartiesAlert.style.display = 'unset'
    } else {
        minimumCheckedPartiesAlert.style.display = 'none'
        match();
        result();
    };
};

/**  
 * Dutch/Nederlands: voor elke vraag kijkt hij naar het aantal partijen en daar loopt hij door heen om de antwoorden te bekijken 
 * 
 * Englis/Engels: matcher, if you checked a subject you find important it will give extra points to the partie that has a matching answer on that question 
 */
function match() {
    for (let m = 0; m < subjects.length; m++) {
        for (let i = 0; i < subjects[m].parties.length; i++) {
            if (answers[m] == subjects[m].parties[i].position) {
                for (let p = 0; p < scores.length; p++) {
                    if (subjects[m].parties[i].name == scores[p].name) {
                        if (questions[m].important) {
                            scores[p].score = scores[p].score + 2;
                        } else {
                            scores[p].score = scores[p].score + 1;
                        };
                    };
                };
            };
        };
    };
}

/** It will calculate the 100% score and sort the partie scores, then it will show the parties you checked with the score */
function result() {
    subjectTitle.textContent = 'Resultaat';
    score.style.display = 'unset';
    buttonAgain.style.display = 'unset';
    setElement('none');
    importantParties.style.display = 'none';
    var totalScore = subjects.length;
    for (let o = 0; o < subjects.length; o++) {
        if (questions[0].important) {
            totalScore++;
        };
    };
    for (let i = 0; i < scores.length; i++) {
        scores[i].score = scores[i].score / totalScore * 100;
    };
    var highestScore = scores.sort((a, b) => {
        return b.score - a.score;
    });
    for (let d = 0; d < scores.length; d++) {
        if (scores[d].display) {
            var list = document.createElement('LI');
            var partiesList = document.createTextNode(scores[d].name + ': ' + scores[d].score.toFixed(2) + '%');
            list.appendChild(partiesList);
            document.getElementById('score').appendChild(list);
        };
    };
};