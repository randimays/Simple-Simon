"use strict";

$(document).ready(function() {

	var game = {
		level: 1,
		roundSequence: [], // random button sequence for 1 round
		userSequence: [], // user button sequence for the same round
		// checkForAccuracy: function(){
		// 	$(document).mouseup(function(event){
		// 		if
		// 	})
		// }
	}

var gameButtonsArray = $("*[data-value]");

function generateRandom(randomNumber){
	for (var i = 0; i < game.level; i++) {
		var randomNumber = Math.floor(Math.random() * 5) + 0;
		game.roundSequence.push(randomNumber);
	}
	console.log(game.roundSequence);
}

// lightItUp();

function lightItUp(){
	game.roundSequence.forEach(function(number, index) {
		setTimeout(function() {
			$('[data-value="' + number + '"]').animate(
			{"opacity": "1.0"}, 200).animate(
			{"opacity": "0.5"}, 200);
		}, 800 * index);
	})
}

$("*[data-value]").each(function(index, button){
	$(this).on("click", function() {
		$(this).animate(
			{"opacity": "1.0"}, 200).animate(
			{"opacity": "0.5"}, 200);
	})
})

$(document).mouseup(function(event) {
	console.log(eventData);
})


generateRandom();
lightItUp();


});