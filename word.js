var Letter = require("./letter.js");

function Artist (guessArtist) {

	this.artistArray = guessArtist.split('').map(x => new Letter(x));
	this.secretArtist = guessArtist;

	this.displayArtist = function () {
		var displayArtist = []
		this.artistArray.forEach(function (element) {
			displayArtist.push(element.revealLetter());
		})
		console.log(`${displayArtist.join(' ')}\n`);
	}


	this.checkMyGuess = function (myGuess) {
		var artistGuessed = false;
		this.artistArray.forEach(function (element) {
			if (myGuess === element.guessLetter) {
				//change value of property to display letter not _
				element.letterGuessed = true
				//change artistGuessed to true to alert that a letter was guessed
				artistGuessed = true
			}
		})
		if (artistGuessed === true) {
			//update display
			this.displayArtist();
			return true;
		}
		if (artistGuessed === false) {
			//update display
			this.displayArtist();
			return false;
		}
	}
}

module.exports = {
	Artist: Artist,
}
