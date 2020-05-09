var questions = [
	new Question(
		"Wat is het antwoord?",
		0,
		["vogel", "hond", "kat"],
		["uitleg voor a", "uitleg voor b", "uitleg voor c"]
	),
	new Question(
		"geef een antwoord?",
		0,
		["muis", "cavia", "hamster"],
		["uitleg voor a", "uitleg voor b", "uitleg voor c"]),
	new Question(
		"een hele lange vraag met een heel lang antwoord test test test mooi?",
		0,
		["dat kan ja zeker dat is mooi om te testen zekerweten", "dat kan ja zeker dat is mooi om te testen zekerweten", "dat kan ja zeker dat is mooi om te testen zekerweten"],
		["uitleg voor a", "uitleg voor b", "uitleg voor c"]
	),
	new Question(
		"de vraag?",
		0,
		["antwoord A", "antwoord B", "antwoord C"],
		["uitleg voor antwoord A", "uitleg voor antwoord B", "uitleg voor antwoord C"]
	),
]

function Question(question, correctAnswer, answers, answerExplenations) {
	this.question = question;
	this.correctAnswer = correctAnswer;
	this.answers = answers;
	this.answerExplenations = answerExplenations;
}