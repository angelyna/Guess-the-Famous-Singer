//This file requires the word.js file.
var theArtist = require("./word.js");

//The game requires inquirer npm package to prompt user to enter a letter.
var inquirer = require("inquirer");

//The game requires 'is-letter' npm package to validate letter values..
var isLetter = require('is-letter');

//Use cli-color npm package to add color to the game.
var clc = require('cli-color');

//Use figlet npm package to convert text to drawing.
var figlet = require('figlet');

//pre-defined color for game text.
var gameTextColor = clc.cyanBright;

//My predefined list of artist to randomly choose from. 
var artistList = ["SIA", "ELVIS", "MICHAEL"];

var remainingGuesses = 10;

//create variables to store guessed letters
var lettersGuessed = [];
var correctLetters = [];
var startGame = false;


var randomArtist = Math.floor(Math.random() * artistList.length);
var currentArtist = new theArtist.Artist(artistList[randomArtist]);

//Display 'Game Theme text characters' to drawings using figlet npm package.
figlet("Guess   the   Famous   Artist", function (err, data) {
	if (err) {
		console.log('error...');
		console.dir(err);
		return;
	}
	console.log(data);
	//Welcome screen text.
	console.log(gameTextColor("Welcome! This game plays at your console."));
	console.log(gameTextColor("-----------------------------------------------------------------------"));
	playGame();
});

function playGame() {
	//display for start game
	if (remainingGuesses === 10 && startGame === false) {
		console.log(gameTextColor(`You have 10 chances to guess this famous artist comprised of ${currentArtist.secretArtist.length} letters:`));
		currentArtist.displayArtist();
		startGame = true;
	}
	inquirer.prompt(
		{
			type: "input",
			name: "myGuess",
			message: "Guess a Letter: ",
			validate: function(value) {
				if(isLetter(value)){
				  return true;
				} 
				else {
				  return false;
				}
			  }
		}
	).then(function (answer) {
		//store users guess
		var myGuess = answer.myGuess.toUpperCase();
		var indexCheckArray = theArtist.checkArray;
		//check to see if the letter has been guessed if not store if it has send message and replay turn
		if (lettersGuessed.includes(myGuess)) {
			console.log(gameTextColor(`${myGuess}: You already guessed this letter! Choose again!
			`));
			playGame();
		} else {
			//push letter guessed into array 
			lettersGuessed.push(myGuess);
			//check user guess to each letter, set value to true if match
			if (currentArtist.checkMyGuess(myGuess) === true) {
				//push user guess into correctletter array
				currentArtist.secretArtist.split("").forEach(function (element) {
					if (myGuess === element) {
						correctLetters.push(myGuess);
					}
					if (element === "") {
						correctLetters.push(element);
					}
				})
				//correct
				console.log(gameTextColor(`Your guess is right! \n Remaining choices: ${remainingGuesses}
				`))
				scoreGame();
			} else {
				remainingGuesses--
				console.log(gameTextColor(`This is not the right letter! \n Remaining choices: ${remainingGuesses}
				`));
				scoreGame();
			}
		}
	})
}



function scoreGame() {
	if (remainingGuesses > 0 && correctLetters.length < currentArtist.secretArtist.length) {
		playGame()
	}
	if (remainingGuesses > 0 && correctLetters.length === currentArtist.secretArtist.length) {
		//remove last word from the array of artists
		artistList.splice(randomArtist, 1);
		if (artistList.length === 0) {
			console.log(gameTextColor("Congratulations! You completed all the game levels! There are no secret artists to be guessed! Play again for fun!"));
			return
		} else {
			console.log(gameTextColor("Congratulations! Continue playing to complete the game or press 'control + c' to exit this game."));
			randomArtist = Math.floor(Math.random() * artistList.length);
			//generate new word
			currentArtist = new theArtist.Artist(artistList[randomArtist]);
			//reset turns
			remainingGuesses = 10;
			// empty check array
			correctLetters = [];
			// empty letters Guessed
			lettersGuessed = [];
			//playGame
			currentArtist.displayArtist();
			playGame();
		}
	}
	if (remainingGuesses === 0 && correctLetters.length !== currentArtist.secretArtist.length) {
		console.log(gameTextColor("You missed this artist! Play again or press 'control + c' to exit this game."));
		randomArtist = Math.floor(Math.random() * artistList.length);
		//generate new word
		currentArtist = new theArtist.Artist(artistList[randomArtist]);
		//reset turns
		remainingGuesses = 10;
		// empty check array
		correctLetters = [];
		// empty letters Guessed
		lettersGuessed = [];
		//playGame
		currentArtist.displayArtist();
		playGame();
	}
}