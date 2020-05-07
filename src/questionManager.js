const questionNumTxt = document.getElementById("questionNumber");
var questionNum = 1;


var questions = [
	new Question("Wat is het antwoord", 1, ["vogel", "hond", "kat"]),
	new Question("geef een antwoord", 2, ["muis", "cavia", "hamster"])
]

var minQuestion = 0;
var maxQuestion = questions.length - 1;

const questionTxt = document.getElementById("question");
const answerATxt = document.getElementById("answerA");
const answerBTxt = document.getElementById("answerB");
const answerCTxt = document.getElementById("answerC");

const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");

prevBtn.onclick = previousQuestion;
submitBtn.onclick = submitQuestion;
nextBtn.onclick = nextQuestion;

function Question(question, correctAnswer, answers) {
	this.question = question;
	this.correctAnswer = correctAnswer;
	this.answers = answers;
}

function previousQuestion() {
	if (questionNum > minQuestion) {
		questionNum -= 1;
		showQuestion(questionNum);
	}
}

function submitQuestion() {

}

function nextQuestion() {
	if (questionNum < maxQuestion) {
		questionNum += 1;
		showQuestion(questionNum);
	}
}


function showQuestion(id) {
	questionNum = id;
	questionNumTxt.innerHTML = id + 1;

	questionTxt.innerHTML = questions[id].question;
	answerATxt.innerHTML = questions[id].answers[0];
	answerBTxt.innerHTML = questions[id].answers[1];
	answerCTxt.innerHTML = questions[id].answers[2];
}

showQuestion(0);