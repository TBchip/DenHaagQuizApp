const electron = require('electron');
const remote = electron.remote;
const path = require('path');

const questionTxt = document.getElementById("questionTxt");
const answerATxt = document.getElementById("answerATxt");
const answerBTxt = document.getElementById("answerBTxt");
const answerCTxt = document.getElementById("answerCTxt");

const answerBtns = [
	document.getElementById("answerABtn"),
	document.getElementById("answerBBtn"),
	document.getElementById("answerCBtn"),
]

const correctAnswerTxt = document.getElementById("correctAnswerTxt");
const answerExplenationTxt = document.getElementById("answerExplenationTxt");

const prevBtn = document.getElementById("prevQuestionBtn");
const submitBtn = document.getElementById("submitQuestionBtn");
const nextBtn = document.getElementById("nextQuestionBtn");

const statsTxt = document.getElementById("stats");

var passedQuestions = new Array(questions.length);
passedQuestions.fill(false);

let currentQuestionIndex = 0;
let minQuestion = 0;
let maxQuestionUnlocked = 0;

let wrongAnswers = 0;
let correctAnswers = 0;

var answeredQuestions = new Array(questions.length);
answeredQuestions.fill(false);

prevBtn.onclick = previousQuestion;
submitBtn.onclick = submitQuestion;
nextBtn.onclick = nextQuestion;


function previousQuestion() {
	if (currentQuestionIndex > minQuestion) {
		currentQuestionIndex -= 1;
		showQuestion(currentQuestionIndex);
		updateNextBtnState();
	}
}
function submitQuestion() {
	//return if no btn checked
	let noBtnChecked = true;
	answerBtns.forEach(btn => {
		if (btn.checked == true) {
			noBtnChecked = false;
		}
	});
	if (noBtnChecked)
		return;


	if (answerBtns[questions[currentQuestionIndex].correctAnswer].checked) {
		correctAnswerTxt.innerHTML = "goed";
		if (passedQuestions[currentQuestionIndex] == false) {
			passedQuestions[currentQuestionIndex] = true;
			maxQuestionUnlocked += 1;
			if (answeredQuestions[currentQuestionIndex] == false)
				correctAnswers++;
		}
	} else {
		correctAnswerTxt.innerHTML = "fout";
		if (answeredQuestions[currentQuestionIndex] == false)
			wrongAnswers++;
	}

	answeredQuestions[currentQuestionIndex] = true;

	if (answerBtns[0].checked)
		updateExplanation(0);
	else if (answerBtns[1].checked)
		updateExplanation(1);
	else if (answerBtns[2].checked)
		updateExplanation(2);

	updateStats()
	resetAnswerBtns();

	updateNextBtnState();
}
function nextQuestion() {
	if (currentQuestionIndex < maxQuestionUnlocked) {

		if (currentQuestionIndex + 1 >= questions.length) {
			finishQuiz();
			return;
		}

		currentQuestionIndex += 1;
		showQuestion(currentQuestionIndex);
		updateNextBtnState();
	}
}

function resetAnswerBtns() {
	answerBtns.forEach(btn => {
		btn.checked = false;
	});
}

function updateExplanation(id) {
	if (id == -1) {
		answerExplenationTxt.innerHTML = "";
	}
	else {
		answerExplenationTxt.innerHTML = questions[currentQuestionIndex].answerExplenations[id];
	}
}

function getAnsweredQuestions() {
	let answeredQuestionsNum = 0;
	answeredQuestions.forEach(answered => {
		if (answered) {
			answeredQuestionsNum++;
		}
	});
	return answeredQuestionsNum;
}

function updateNextBtnState() {
	if (currentQuestionIndex < maxQuestionUnlocked) nextBtn.disabled = true;
	else nextBtn.disabled = false;
}

function updateStats() {
	let newTxt = wrongAnswers.toString() + " fout, " + correctAnswers.toString() + " goed, " + getAnsweredQuestions().toString() + "/" + questions.length.toString() + " beantwoord";
	statsTxt.innerHTML = newTxt;
}

function finishQuiz() {
	remote.getGlobal('questionStats').correctAnswers = correctAnswers;
	remote.getGlobal('questionStats').wrongAnswers = wrongAnswers;
	remote.getGlobal('questionStats').totalQuestions = questions.length;
	remote.getCurrentWindow().loadFile(path.join(__dirname, 'finalPage.html'));
}


function showQuestion(id) {
	currentQuestionIndex = id;

	resetAnswerBtns();
	updateExplanation(-1);
	correctAnswerTxt.innerHTML = "";

	questionTxt.innerHTML = (currentQuestionIndex + 1).toString() + ": " + questions[id].question;
	answerATxt.innerHTML = questions[id].answers[0];
	answerBTxt.innerHTML = questions[id].answers[1];
	answerCTxt.innerHTML = questions[id].answers[2];
}

updateStats();
showQuestion(0);