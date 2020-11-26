var panel = document.getElementById('panel')
var subjectTitle = document.getElementById('subjectTitle');
var subjectDiscription = document.getElementById('subjectDiscription');
var buttons = document.getElementById('buttons')
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');

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
subjectDiscription.textContent = subjects[question]['statement'];

button1.onclick = function () {
    myAnswer('pro');
};
button2.onclick = function () {
    myAnswer('none');
};
button3.onclick = function () {
    myAnswer('contra');
};

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
        for (let i = 0; i < parties.length-1; i++) {
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

function result(){
    subjectTitle.textContent = 'Resultaat';
    subjectDiscription.style.display = 'none';
    buttons.style.display = 'none';
    var highestScore = score.sort((a, b) => {
        return b.score - a.score;
    });
    for (let d = 0; d < highestScore.length; d++) {
        var x = document.createElement("LI");
        var t = document.createTextNode(highestScore[d]['name'] + ' ' + highestScore[d]['score'].toFixed(2) + '%');
        x.appendChild(t);
        document.getElementById("score").appendChild(x);
    }
}