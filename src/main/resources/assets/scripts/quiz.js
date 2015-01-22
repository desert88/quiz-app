$(document).ready(function() {
	var questionNumber = 0;
	var score = 0;
	var savedAnswers = [];
	var questions = [
		{
			question: "Who is the PM of England?",
			choices: ["John Stamos", "Gordon Brown", "Barack Obama", "Queen Elizabeth"],
			answer: 1
		},
		{
			question: "What color is the sky?",
			choices: ["Green", "Potato", "Blue", "Turqoise"],
			answer: 2 
		},
		{
			question: "Do you like green eggs and ham?",
			choices: ["Yes", "No", "What?", "Depends on how the eggs are cooked", "I don't know"],
			answer: 0
		}
	];
	var $quizBox = $('#quiz-box');
	$quizBox.empty();

	var createQuestion = function()	{
		console.log('quest #: ' + questionNumber);
		var $divEl;
		var $inputEl;
		var $labelEl;
		var inputId;
		var question = questions[questionNumber];
		var choices = question.choices;
		var i;
		var $questionEl = $('<p>').text(question.question);
		$quizBox.append($questionEl);
		for (i = 0; i < choices.length; i++) {
			$divEl = $('<div>', {class: 'radio'});
			inputId = 'input' + i;
			$inputEl = $('<input>', {name: 'answers', type: 'radio', id: inputId, value: i.toString()});
			$labelEl = $('<label>', {'for': inputId}).text(choices[i]);
	 		$divEl.append($inputEl);
			$divEl.append($labelEl);
			$quizBox.append($divEl);
		}
	}

	var showScore = function () {
		var $quizRegion = $('#quiz-region');
		$quizRegion.empty();
		var score = 0;
		var i; 
		for (i = 0; i < questions.length; i++) {
			if (savedAnswers[i] == questions[i].answer) {
				score++;
			}
		}
		var $scoreEl = $('<p>', {id: 'score'}).text('Score: ' + score + '/' + questions.length);
		$quizRegion.append($scoreEl);
	}

	var warnNoSelection = function () {
		//Check if element already present
		if(!$('#warning').length) {
			var $warningEl = $('<p>', {id:'warning'}).text('Please select an answer.');
			$warningEl.hide().insertAfter('#next').fadeIn(750).delay(750).fadeOut(750, 
				function() {
					$(this).remove();
				});
		}
	}

	var getAnswer = function() {
		var val = $('input[name=answers]:checked', '#quiz-box').val();
		console.log("Value: " + val);
		return val;
	}

	var restoreAnswer = function() {
		var savedAnswer = savedAnswers[questionNumber];
		if (savedAnswer) {
			$('#input' + savedAnswer).prop('checked', true);
		}
	}

	createQuestion();
	$('#next').click(function() {
		$(this).blur();
		var val = getAnswer();
		console.log("Value: " + val);
		if(val == undefined) {
			warnNoSelection();
			return;
		}

		if (questionNumber == 0) {
			$('#previous').show();
		}
		savedAnswers[questionNumber] = val;
		questionNumber++;
		if (questionNumber < questions.length) {
			$quizBox.empty();
			createQuestion();
			restoreAnswer();
		} else {
			$(this).off();
			showScore();
			$('#next').remove();
			$('#previous').remove();
		}
	});

	$('#previous').click(function() {
		if (questionNumber == 1) {
			$(this).hide();
		} 
		var val = getAnswer();
		console.log("Value: " + val);
		savedAnswers[questionNumber] = val;
		questionNumber--;
		$quizBox.empty();
		createQuestion();
		restoreAnswer();
	});








});