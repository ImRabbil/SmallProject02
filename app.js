const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answer-indicator") ;
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestion = [];
let availableOptions = [];
let correctAnswer = 0;
let attempt = 0;



// push the question into availableQuestion Array

function setAvailableQuestion(){
	const totalQuestion = quiz.length;
	for(let i = 0; i<totalQuestion; i++){
		availableQuestion.push(quiz[i]);
	}

}

//set  question number and question and option

function getNewQuestion(){
	//set question number
	questionNumber.innerHTML = "Question" +(questionCounter + 1)+ "of" + quiz.length;
	//set question text
	//set random question
	const questionIndex = availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
	currentQuestion = questionIndex;
	questionText.innerHTML = currentQuestion.q;
	// get the position of questionIndex from the availableQuestion Array
	const index1 = availableQuestion.indexOf(questionIndex);
	//remove the questionIndex from the availableQuestion Array. so that does not repeated.
	availableQuestion.splice(index1,1);
	//console.log(index1);
	//console.log(questionIndex);
	//console.log(availableQuestion);


	//set option
	//get the length of option
	//console.log(currentQuestion.options);
	const optionLen = currentQuestion.options.length;

	//push option into availableOption Array
	for(let i = 0; i < optionLen; i++){
		availableOptions.push(i);
	}

	optionContainer.innerHTML = '';
	let animationDelay = 0.15;
	//console.log(availableOptions);
	//create option HTML
	for(let i = 0; i< optionLen; i++){
		//random option
	const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
	//get the position of 'optonIndex' from availableOptions
	const index2 = availableOptions.indexOf(optonIndex);
	//remove the 'optonIndex' from availableOptions. so that does not repeated.
	availableOptions.splice(index2,1);
	

	const option = document.createElement("div");
	option.innerHTML = currentQuestion.options[optonIndex];
	option.id = optonIndex;
	option.style.animationDelay = animationDelay + 's';
	animationDelay = animationDelay + 0.15;
	option.className = "option";
	optionContainer.appendChild(option);
	option.setAttribute("onclick", "getResult(this)");
	}


	questionCounter++;

}

//get the result of current attempt question

function getResult(element)
{
	const id =parseInt(element.id) ;

//	get the answer by comparing the id of clicked option
	if(id === currentQuestion.answer){
		// set the green color to the correct option
		element.classList.add("correct");
		//add the indicator to correct mark
		updateAnswerIndicator("correct");
		correctAnswer++;
	}
	else{
		// set the red color to the wrong option
		element.classList.add("wrong");

		//add the indicator to wrong mark
		updateAnswerIndicator("wrong");
		// if the answer is wrong is show the  the correct option by adding green color the correct option
		const optionLen = optionContainer.children.length;

		for( let i = 0; i < optionLen; i++){
			if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
				optionContainer.children[i].classList.add("correct");
			}
		}
	}
	attempt++;
	unclickableOptions();
}
// make all the option unclickable once the select a option (restrict the user to changed option again)
function unclickableOptions(){
	const optionLen = optionContainer.children.length;
	for(let i = 0; i < optionLen; i++){
		optionContainer.children[i].classList.add("already-answered");
	}

}

function answerIndicator(){
	answerIndicatorContainer.innerHTML = '';
	const totalQuestion = quiz.length;
	for( let i = 0; i < totalQuestion; i++){
		const indicator = document.createElement("div");
		answerIndicatorContainer.appendChild(indicator);
	}
}

function updateAnswerIndicator(markType){
	answerIndicatorContainer.children[questionCounter-1].classList.add(markType);

}

function next(){
	if(questionCounter === quiz.length){
		quizOver();
	}
	else{
		getNewQuestion();
	}
}
 function quizOver(){
 	//hide quiz quizBox

 	quizBox.classList.add("hide");
 	//show result box
 	resultBox.classList.remove("hide");
 	quizResult();

 }
 // get the quiz result 
 function quizResult(){

 	resultBox.querySelector(".total-question").innerHTML =quiz.length;
 	resultBox.querySelector(".total-attempt").innerHTML = attempt;
 	resultBox.querySelector(".total-correct").innerHTML =correctAnswer;
 	resultBox.querySelector(".total-wrong").innerHTML =attempt - correctAnswer;
 	const percentage= (correctAnswer/quiz.length)*100;
 	resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2)+"%";
 	resultBox.querySelector(".total-score").innerHTML = correctAnswer + " / " + quiz.length;
 }

 function resetQuiz(){
 	 questionCounter = 0;
	 correctAnswer = 0;
	 attempt = 0;

 }

function tryAgainQuiz(){
	// hide the resultBox
	resultBox.classList.add("hide");
	// show the quizBox
	quizBox.classList.remove("hide");
	resetQuiz();
	startQuiz();
}
function goToHome(){
	//hide result
	resultBox.classList.add("hide");
	// show home box
	homeBox.classList.remove("hide");
	resetQuiz();
}
 
// Starting Point
function startQuiz(){
	//hide home box
	homeBox.classList.add("hide");
	//show Quiz box
	quizBox.classList.remove("hide");

	//first we will ser all question in availableQuestion = []; array
	setAvailableQuestion()
	//second we will call getNewQuestion(); function
	getNewQuestion()
	//to create indicator of answer
	answerIndicator();
}

window.onload = function(){
	homeBox.querySelector(".total-question").innerHTML = quiz.length;
}