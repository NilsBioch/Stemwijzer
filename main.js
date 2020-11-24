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

//sets title and statement of first subject
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
    //updates title to the correct question
    subjectTitle.textContent = subjects[question]['title'];
    subjectDiscription.textContent = subjects[question]['statement'];
    //sets current answer in the answer array
    answers[question] = antwoord;
    question++;
    if (question == subjects.length) {
        //resets question 
        question = 0;
        subjectTitle.textContent = subjects[question]['title'];
        subjectDiscription.textContent = subjects[question]['statement'];
        //if every question is answered calculate the match
        match();
        var highestScore = score.sort((a, b) => {
            return b.score - a.score;
        });
        console.log(highestScore[0]);
        subjectTitle.textContent = 'Resultaat';
        subjectDiscription.textContent = highestScore[0]['name'] + ' score is ' + highestScore[0]['score'].toFixed(2) + '%';
        buttons.style.display = 'none';
    }
}

function match() {
    //for every subject match te opinion with your answer
    //loops trough subjects
    for (let m = 0; m < subjects.length; m++) {
        console.log('question ' + subjects[m]['title']);
        //loops trough parties
        for (let i = 0; i < parties.length - 1; i++) {
            //matches answer with your answer
            if (answers[m] == subjects[m]['parties'][i]['position']) {
                console.log('je antwoord matched met ' + subjects[m]['parties'][i]['name']);
                for (let p = 0; p < parties.length; p++) {
                    if (subjects[m]['parties'][i]['name'] == score[p]['name']) {
                        score[p]['score'] = score[p]['score'] + 100 / subjects.length;
                    }
                }
            }
        }
    }
}