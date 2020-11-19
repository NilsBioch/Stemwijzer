var subjectTitle = document.getElementById('subjectTitle');
var subjectDiscription = document.getElementById('subjectDiscription');
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
//question
var question = 0;
// answers 
answers = [];
//sets title and statement of first subject
subjectTitle.textContent = subjects[question]["title"];
subjectDiscription.textContent = subjects[question]["statement"];

button1.onclick = function () {
    myAnswer('pro');
};
button2.onclick = function () {
    myAnswer('none');
};
button3.onclick = function () {
    myAnswer('contra');
};

function myAnswer(antwoord){
    //updates title to the correct question
    subjectTitle.textContent = subjects[question]["title"];
    subjectDiscription.textContent = subjects[question]["statement"];
    //sets current answer in the answer array
    answers[question] = antwoord;
    question++;
    if(question == subjects.length){
        //resets question count
        question = 0;
        //sets title and statement back to first subject
        subjectTitle.textContent = subjects[question]["title"];
        subjectDiscription.textContent = subjects[question]["statement"];
        //if every question is answered calculate the match
        match();
    }
}

function match() {
    for (let m = 0; m < subjects.length; m++) {
        console.log('question ' + subjects[m]["title"]);
        for (let i = 0; i < parties.length-1; i++) {
            if (answers[m] == subjects[m]['parties'][i]['position']) {
                console.log(subjects[m]['parties'][i]["name"]);
                console.log(true);
            } else {
                console.log(subjects[m]['parties'][i]["name"]);
                console.log(false);
            }
        }
    }
}


