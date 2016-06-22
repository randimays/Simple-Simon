"use strict";

// $(document).ready(function() {

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

	// var gameButtonsArray = $(".gamebutton");


function generateRandom(randomNumber){
	var randomNumber = Math.floor(Math.random() * 5) + 0;
	game.roundSequence.push(randomNumber);
	console.log(game.roundSequence);
	lightItUp();
}

function lightItUp(){
	game.roundSequence.forEach(function(number, i){
		if (game.roundSequence[i] == 0) {
		 	$('*[data-value="0"]').animate({
		 		opacity: 1.0}, 200, function() {
		 			$(this).fadeTo(200, 0.5);
		 		})
		}
		 	// console.log($('*[data-value="game.roundSequence[i]"]'));
	})
}
// .fadeTo("fast", 1.0)

generateRandom();
lightItUp();

		 	// console.log($("*[data-value="0"]"));
			// if (randomNumber == gameButtonsArray[i].dataset.value) {
			// 	console.log("match!");
			// 	$(gameButtonsArray[i]).fadeIn(1000);
		// var gameButtonsArray[i].(parseInt(.dataset.value));

// });


