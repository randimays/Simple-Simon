"use strict";

$(document).ready(function() {

var game = {
	level: 1,
	roundSequence: [],
}

var index = 0;

var gameButtonsArray = $("*[data-value]");
var message = $("#message");
var levelNumber = $("#levelnumber");

function generateRandom(randomNumber){
	game.roundSequence = [];
	
	setTimeout(function(){
		do {
			game.roundSequence.push(Math.floor(Math.random() * 5) + 0);
		} while (game.roundSequence.length < game.level);
		console.log(game.roundSequence);
		lightItUp();

	}, 500);
}

function lightItUp(){
	var i = 0;
	var id = setInterval(function() {
		$('[data-value="' + game.roundSequence[i] + '"]').animate({
			"opacity": "1.0"
		}, 200).animate({
			"opacity": "0.5"
		}, 200);
		i++;
		if (i == game.roundSequence.length) {
			clearInterval(id);
		}
	}, 800)
}

gameButtonsArray.click(function(event) {
	var userClick = parseInt($(this).data("value"));

	if (userClick == game.roundSequence[index]) {	
		message.html("Good...");
		index++;
	} else {
		message.html("Nope. Start a new game.");
		index = 0;
		game.level = 1;
		levelNumber = 1;
	}

	if (index == game.roundSequence.length) {
		message.html("Next level!");
		game.level += 1;
		index = 0;
		levelNumber.html(1 + parseInt(levelNumber.html());
		generateRandom();		
	}
});


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



});