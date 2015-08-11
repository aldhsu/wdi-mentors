var prompt = require("prompt");
var Promise = require("promise");
(function() {
"use strict";
})();

//helper functions
function sample(ary) {
  var length = ary.length;
  return ary[Math.floor(Math.random() * length)];
}

function determineWinner(handOne, handTwo, handAry) {
  var posOne = handAry.indexOf(handOne);
  var posTwo = handAry.indexOf(handTwo);
  return ((posOne + 1) % (handAry.length)) === posTwo;
}

//game logic
function scissorPaperRock() {
  var hands = ["scissor" ,"paper", "rock"];
  var message = hands.reduce(function(string, hand, index) {
    return string + (index + 1) + ": " + hand;
  }, "");

  return new Promise(function(resolve, reject) {
    console.log("Choose a hand to throw: " + message);
    prompt.start();

    return prompt.get(["hand"], function(err, result) {
      if (err) { return reject(err); }
      return resolve(hands[result.hand - 1]);
    });
  }).then(function(playerHand) {
    var computerHand = sample(hands);
    var hasPlayerWon = determineWinner(playerHand, computerHand, hands);
    var hasComputerWon = determineWinner(computerHand, playerHand, hands);

    console.log("Player chose: " + playerHand, "Computer chose: " + computerHand);

    if (!hasPlayerWon && !hasComputerWon) {
      console.log("tie");
      return [0, 0];
    } else {
      console.log(hasPlayerWon ? "Player Won" : "Computer Won");
      return hasPlayerWon ? [1, 0] : [0, 1];
    }
  }, function() {
    console.log("Error");
  });
}
var playerPoints = 0;
var computerPoints = 0;

//game loop
function gameLoop() {
  scissorPaperRock().then(function(result) {
    playerPoints += result[0];
    computerPoints += result[1];
    console.log("Player:" + playerPoints, "Computer:" + computerPoints);

    return gameLoop();
  });
}

//

gameLoop();

