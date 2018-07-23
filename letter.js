function Letter (guessLetter) {
    this.guessLetter = guessLetter;
    //guessLetter = secret letter
    //letterGuessed = letter guessed by user
    this.letterGuessed = false;
    this.revealLetter = function () {
        if (this.letterGuessed) {
            return this.guessLetter;
        } else {
            return '_';
        }
    }
}

module.exports = Letter;

