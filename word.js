var letter = require('./letter.js');

function myWord(target) {
  this.target = target;
  this.lets = [];
  this.found = false;

  this.getLetter = function() {
    for (var i = 0; i < this.length; i++) {
      this.lets.push( new letter(this.target[i]));
    }
  };

  this.findWord = function() {
    this.found = this.lets.every(function(currentLetter) {
      return currentLetter.appear;
    });
    return this.found;
  };

  this.testLetter = function(letterGuessed) {
    var toBeReturned = 0;

    for(var i = 0; i < this.lets.length; i++) {
      if(this.lets[i].charac == letterGuessed) {
        this.lets[i].appear = true;
        toBeReturned++;
      }
    }
    return toBeReturned;
  };

  this.renderWord = function() {
    var string = '';
    for(var i = 0; i < this.lets.length; i++) {
      string += this.lets[i].renderLetter();
    }
    return string;
  };
}

module.exports = myWord;
