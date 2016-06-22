"use strict";

$(document).ready(function() {

var index = 0;
	var game = {
		level: 1,
		roundSequence: [], // random button sequence for 1 round
		// userSequence: [], // user button sequence for the same round
	}

var gameButtonsArray = $("*[data-value]");
var message = $("#message");
var levelNumber = $("#levelnumber");

function generateRandom(randomNumber){
	var randomNumber = Math.floor(Math.random() * 5) + 0;
	
	setTimeout(function(){
		game.roundSequence = [];
		console.log(game.roundSequence);

		do {
			game.roundSequence.push(randomNumber);
		} while (game.roundSequence.length < game.level);
		console.log(game.roundSequence);
		lightItUp();

	}, 1000);
}


function lightItUp(){
	game.roundSequence.forEach(function(number, index) {
		setTimeout(function() {
			$('[data-value="' + number + '"]').animate({
				"opacity": "1.0"
			}, 200).animate({
				"opacity": "0.5"
			}, 200), 800 * index;
		})
	});
	checkUserSequence();
}

$("*[data-value]").each(function(index, button){
	$(this).on("click", function() {
		$(this).animate(
			{"opacity": "1.0"}, 300).animate(
			{"opacity": "0.5"}, 300);
	});
})

$("#startGame").on("click", function() {
	levelNumber.html("1");
	message.html("Let's go!");
	generateRandom();
})

$(document).mouseup(function(event) {
	var userClick = parseInt(event.target.dataset.value);
	return userClick;
	checkUserSequence(event);
});

function checkUserSequence() {
	if (event.target.dataset.value == game.roundSequence[index]) {
		message.html("Good...");
			index++;
	} else {
		message.html("Nope. Start a new game.");
			index = 0;
	}

	if (index == (game.roundSequence.length)) {
		game.level += 1;
		game.roundSequence = [];
		generateRandom();		
	}
}

});