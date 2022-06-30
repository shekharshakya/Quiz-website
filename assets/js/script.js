let continueBtn = document.querySelector("#continue-btn");
let nequestion = document.querySelector("#next-question");


continueBtn.onclick = () => {
    Showquestion(0);
    nextquestiontimer();
}

// move to next question
let questionCount = 0;
const nextquestion = () => {
    stoptimer();
    timersec = 0;
    nextquestiontimer();
    if (questionCount < questionList.length - 1) {
        questionCount++;
        Showquestion(questionCount);

    } else if (questionCount == questionList.length - 1) {
        stoptimer();
    } else {
        console.log("Question Complete");
    }
}

// show quiz question
function Showquestion(i) {
    let questionText = document.querySelector(".question-text");
    let optionlist = document.querySelector(".option-list");

    let questiontag = `<span> ${questionList[i].que} </span>`
    let optionstag = `<div class="option">
    <span>${questionList[i].option[0]}</span>
    <i class="fa-solid"></i>
    </div>
<div class="option">
    <span>${questionList[i].option[1]}</span>
    <i class="fa-solid"></i>
</div>
<div class="option">
    <span>${questionList[i].option[2]}</span>
    <i class="fa-solid"></i>
</div>
<div class="option">
    <span>${questionList[i].option[3]}</span>
    <i class="fa-solid"></i>
</div>`;
    questionText.innerHTML = questiontag;
    optionlist.innerHTML = optionstag;

    let complete = document.querySelector("#complete-question");
    complete.innerHTML = `${questionList[i].number}`;

    let totalquestion = document.querySelector("#total-question");
    totalquestion.innerHTML = `${questionList.length}`;

    let option = optionlist.querySelectorAll(".option")
    for (let i = 0; i <= option.length - 1; i++) {
        option[i].setAttribute("onclick", "optionselected(this)");

    }
}

// select your answer 
let correctQuestion = 0;
let incorrectQuestion = 0;
let totalClick = 0;

function optionselected(answer) {
    let ans = answer.textContent.trim();
    let corans = `${questionList[questionCount].ans}`;
    nextquestion();
    if (corans.trim() == ans) {
        correctQuestion++;
        totalClick++;
    } else {
        incorrectQuestion++;
        totalClick++;
    }
    if (totalClick == questionList.length) {
        showresult()
    }
}


// show result
function showresult() {
    console.log(`your correct answer : ${correctQuestion} and incorrect answer : ${incorrectQuestion}`);
    document.getElementById("result").style.display = "block";
    document.getElementById("correct").innerHTML = `${correctQuestion} `
    document.getElementById("incorrect").innerHTML = ` ${incorrectQuestion}`
    document.getElementById("quiz-qa-info").style.display= "none"
    document.querySelector(".total-que").style.display = "none"
}

// next question timer
let timersec = 0;
function nextquestiontimer() {
    mytimer = setInterval(function myTimer() {
        document.getElementById("time-sec").innerHTML = timersec++;
        if (timersec == 15) {
            timersec = 0;
            if (questionCount !== questionList.length - 1) {
                questionCount++;
                Showquestion(questionCount);

            } else {
                clearInterval(mytimer);
                showresult();
            }
        }
    }, 1000);
}

// stop timer
function stoptimer() {
    clearInterval(mytimer);
}