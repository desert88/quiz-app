$(document).ready(function() {
	$.ajax("http://localhost:8080/api/quiz?id=0").then(function(data) {
		var questions = data.questions;
		var choiceSets = data.choices;
	
	var questionNumber = 0;
	var savedAnswers = [];
	var $quizBox = $('#quiz-box');
	$quizBox.empty();

	var createQuestion = function()	{
		var $divEl;
		var $inputEl;
		var $labelEl;
		var inputId;
		var question = questions[questionNumber];
		var choices = choiceSets[questionNumber];
		var i;
		var $questionEl = $('<p>').text(question);
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
		$.ajax({
			url: "http://localhost:8080/api/score", 
			type: 'POST',
			dataType:'json', 
			contentType: 'application/json',
			data: JSON.stringify({'answers': savedAnswers})

		}).then(function(data) {
			var $scoreEl = $('<p>', {id: 'score'}).text('Score: ' + data.score + '/' + questions.length);
			$quizRegion.append($scoreEl);
		});
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
		$(this).blur();
		if (questionNumber == 1) {
			$(this).hide();
		} 
		var val = getAnswer();
		savedAnswers[questionNumber] = val;
		questionNumber--;
		$quizBox.empty();
		createQuestion();
		restoreAnswer();
	});




});



});