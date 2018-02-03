var myWord = require('./word.js');
var prompt = require('prompt');

console.log("Hangman Game");
console.log("Guess an ice cream flavor.");
console.log("Time to begin");
console.log("----------------------------");

prompt.start();

myGame = {
  solutionBank: ['Vanilla', 'Chocolate', 'Strawberry', 'Neopolitan', 'Sherbet', 'Rocky Road', 'Praline', 'Mint Chocolate Chip', 'Cookie Dough'],
  wins: 0,
  triesRemaining: 12,
  chosenWord: null,

  beginGame: function(word) {
    this.resetTries();
    this.chosenWord = new myWord(this.solutionBank[Math.floor(Math.random()* this.solutionBank.length)]);
    this.chosenWord.getLetter();
    this.alertUser();
  },

  resetTries: function(){
    this.triesRemaining = 12;
  },

  alertUser: function(){
    var me = this;
    prompt.get(['letterGuessed'], function(err, result){
      console.log("You guessed: " + result.letterGuessed);
      var guessCount = me.chosenWord.testLetter(result.letterGuessed);

      if(guessCount == 0) {
        console.log("FAIL");
        me.triesRemaining--;
      } else {
        console.log("CORRECT GUESSING");
        if(me.chosenWord.findWord()){
          console.log("WINNER WINNER");
          console.log("--------------------");
          return;
        }
      }

      console.log("Tries remaining: " + me.triesRemaining);
      console.log("---------------------");
      if((me.triesRemaining > 0) && (me.chosenWord.found == false)){
        me.alertUser();
      }
      else if(me.triesRemaining == 0) {
        console.log("Gave over. The correct word was ", me.chosenWord.target);
      } else {
        console.log(me.chosenWord.renderWord());
      }
    });
  }
};

myGame.beginGame();
