"use strict";

$(document).ready(function() {

	var index = 0;
	var gameButtonsArray = $("*[data-value]");
	var soundsArray = $("*[data-sound]");
	var message = $("#message");
	var levelNumber = $("#levelnumber");
	var game = {
		level: 1,
		speed: 1,
		minSpeed: .32,
		speedIncrement: .08,
		roundSequence: [],
		clickable: false
	}

	function generateRandom(randomNumber){
		setTimeout(function(){
			do {
				game.roundSequence.push(Math.floor(Math.random() * 5) + 0);
			} while (game.roundSequence.length < game.level);
			lightItUp();
		}, 400);
	}

	function lightItUp(){
		var i = 0;
		var id = setInterval(function() {
			$('[data-sound="' + game.roundSequence[i] + '"]').trigger("play");
			$('[data-value="' + game.roundSequence[i] + '"]').animate({
				"opacity": "1.0"
			}, 200).animate({
				"opacity": "0.5"
			}, 200);
			i++;
			if (i == game.roundSequence.length) {
				clearInterval(id);
			}
		}, 800 * game.speed)
	}
	
	game.clickable = true;

	if (game.clickable) {
		$("*[data-value]").each(function(index, button){
			$(this).on("click", function() {
				$('[data-sound="' + index + '"]').trigger("play");
				$(this).animate(
					{"opacity": "1.0"}, 200).animate(
					{"opacity": "0.5"}, 200);
			});
		})
		gameButtonsArray.click(function(event) {
			var userClick = parseInt($(this).data("value"));
			if (userClick == game.roundSequence[index]) {	
				message.html("Good...");
				index++;
			} else {
				message.html("Nope. Start a new game.");
				$("#soundeffect2")[0].play();
				index = 0;
				game.level = 1;
			}
			if (index == game.roundSequence.length) {
				game.level += 1;
				index = 0;
				levelNumber.html(1 + parseInt(levelNumber.html()));
				if (game.level % 5 == 0) { 
					message.html(game.level + " Levels Mastered!");
					$("#soundeffect1")[0].play();
				} else {
					message.html("Next level!");
				}
				if (game.speed <= game.minSpeed) {
					game.speed = game.minSpeed;
				} else {
					game.speed -= game.speedIncrement;
				}
				game.clickable = false;
				generateRandom();
			}
		});
	}

	$("#startGame").on("click", function() {
		game.roundSequence = [];
		$("audio")[0].pause();
		$(levelNumber).html("1");
		message.html("Let's go!");
		generateRandom();
	})

});