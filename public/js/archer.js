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

	var gameButtonsArray = $(".gamebutton");
	console.log(gameButtonsArray);

// gameButtonsArray[i].dataset.value;

	// gameButtonsArray.each(function(index, button){
	// 	console.log(button.dataset.value);
	// })




function generateRandom(randomNumber){
	var randomNumber = Math.floor(Math.random() * 5) + 0;
	game.roundSequence.push(randomNumber);
	console.log(game.roundSequence);
	// lightItUp();
}

function lightItUp(){
	game.roundSequence.forEach(function(){

	})
}

generateRandom();

			// if (randomNumber == gameButtonsArray[i].dataset.value) {
			// 	console.log("match!");
			// 	$(gameButtonsArray[i]).fadeIn(1000);

});


