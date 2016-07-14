$(document).ready(function() {

"use strict";

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
		allowUserClick: false,
		allowStartClick: true
	}

	function generateRandom(){
		var i = 0;
		game.allowStartClick = false;
		$("#startGame").css("background-color", "#347817");

		// generate random numbers for game sequence
		setTimeout(function(){
			do {
				game.roundSequence.push(Math.floor(Math.random() * 5) + 0);
			} while (game.roundSequence.length < game.level);
		}, 400);

		// sound & light-up for game sequence
		var id = setInterval(function() {
			$('[data-sound="' + game.roundSequence[i] + '"]').trigger("play");
			$('[data-value="' + game.roundSequence[i] + '"]').animate({
				"opacity": "1.0"
			}, 250).animate({
				"opacity": "0.5"
			}, 250);
			i++;
			if (i == game.roundSequence.length) {
				clearInterval(id);
			}
		}, 800 * game.speed)

		game.allowUserClick = true;
	}

	gameButtonsArray.on("click", function click(event) {
		if(game.allowUserClick) {
			// sound & light-up on user click
			$('[data-sound="' + game.roundSequence[index] + '"]').trigger("play");
			$(this).animate(
				{"opacity": "1.0"}, 200).animate(
				{"opacity": "0.5"}, 200);
			
			var userClick = parseInt($(this).data("value"));
			
			if (userClick == game.roundSequence[index]) {	
				message.html("Good...");
				index++;
				
				if (index == game.roundSequence.length) {
					game.level += 1;
					index = 0;
					levelNumber.html(1 + parseInt(levelNumber.html()));

					// every 5 levels, whoo!!
					if (game.level % 5 == 0) { 
						message.html(game.level + " Levels Mastered!");
						$("#soundeffect1")[0].play();
					} else {
						message.html("Next level!");
					}

					// increase speed with each level mastered
					if (game.speed <= game.minSpeed) {
						game.speed = game.minSpeed;
					} else {
						game.speed -= game.speedIncrement;
					}

					generateRandom();
				}

			} else {
				message.html("Nope. Start a new game.");
				game.allowUserClick = false;
				game.allowStartClick = true;
				$("#startGame").css("background-color", "#48f100");
				$("#soundeffect2")[0].play();
				game.level = 1;
				index = 0;
			}
		}
	});

	$("#startGame").on("click", function() {
		if (game.allowStartClick) {
			message.html("Let's go!");
			levelNumber.html("1");
			game.roundSequence = [];
			$("audio")[0].pause();
			generateRandom();
		}
	})
});