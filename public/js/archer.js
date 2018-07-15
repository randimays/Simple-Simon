$(document).ready(function() {
	"use strict";

	var index = 0;
	var gameButtonsArray = $("*[data-value]");
	var soundsArray = $("*[data-sound]");
	var message = $(".message");
	var levelNumber = $(".stats-text span");
	var highScore = $('.high-score span');
	var game = {
		level: 1,
		speed: 1,
		minSpeed: .32,
		speedIncrement: .05,
		roundSequence: [],
		allowUserClick: false,
		allowStartClick: true
	}

	function playSequenceForRound(i) {
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


	function generateSequenceForRound(){
		var i = 0;
		game.allowStartClick = false;
		$(".start-game").css("background-color", "#347817");

		setTimeout(function(){
			do {
				game.roundSequence.push(Math.floor(Math.random() * 5) + 0);
			} while (game.roundSequence.length < game.level);
		}, 400);	
		
		playSequenceForRound(i);
	}

	function playSoundAndLightUp(image) {
		$('[data-sound="' + game.roundSequence[index] + '"]').trigger("play");
		$(image).animate(
			{"opacity": "1.0"}, 200)
			.animate(
			{"opacity": "0.5"}, 200
		);
	}

	function isUserInputValid(input, roundSequence, index) {
		return input == roundSequence[index];
	}

	function isRoundOver(roundSequence, index) {
		return index == roundSequence.length;
	}

	function increaseSpeedForNextRound() {
		if (game.speed <= game.minSpeed) {
			game.speed = game.minSpeed;
		} else {
			game.speed -= game.speedIncrement;
		}
	}

	function setupGame() {
		message.html("Let's go!");
		levelNumber.html("1");
		game.roundSequence = [];
		$("audio")[0].pause();
		generateSequenceForRound();
	}

	function resetGame() {
		message.html("Nope. Start a new game.");
		game.allowUserClick = false;
		game.allowStartClick = true;
		$(".start-game").css("background-color", "#48f100");
		$(".sound-effect-2")[0].play();
		game.level = 1;
		index = 0;
	}

	gameButtonsArray.on("click", function click(event) {
		// if the game is in 'play' mode
		if (game.allowUserClick) { 
			playSoundAndLightUp(event.target);
			
			var userClick = parseInt($(this).data("value"));

			if (isUserInputValid(userClick, game.roundSequence, index)) {
				message.html("Good...");
				index++;

				if (isRoundOver(game.roundSequence, index)) {
					game.level += 1;
					index = 0;
					levelNumber.html(1 + parseInt(levelNumber.html()));
	
					// every 5 levels, whoo!!
					if ((game.level - 1) % 5 == 0) { 
						message.html((game.level - 1) + " Levels Mastered!");
						$(".sound-effect-1")[0].play();
					} else {
						message.html("Next level!");
					}
	
					increaseSpeedForNextRound();
					generateSequenceForRound();
				}
			} else {
				const highestScoreSoFar = highScore.html();

				if (highestScoreSoFar < game.level) {
					highScore.html(game.level - 1);
				}

				resetGame();
			}
		}
	});

	$(".start-game").on("click", function() {
		if (game.allowStartClick) {
			setupGame();
		}
	})
});