const electron = require("electron");
const remote = electron.remote;
const correctTxt = document.getElementById("correctTxt");
const wrongTxt = document.getElementById("wrongTxt");

let correctAnswers = remote.getGlobal('questionStats').correctAnswers
let wrongAnswers = remote.getGlobal('questionStats').wrongAnswers;
let totalQuestions = remote.getGlobal('questionStats').totalQuestions;

function loadStats() {
	correctTxt.innerHTML = correctAnswers.toString() + "/" + totalQuestions.toString() + " goed";
	wrongTxt.innerHTML = wrongAnswers.toString() + "/" + totalQuestions.toString() + " fout";
}

loadStats();