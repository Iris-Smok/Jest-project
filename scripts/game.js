let game = {
  score: 0,
  currentGame: [],
  playerMoves: [],
  turnNumber: 0,
  choices: ["button1", "button2", "button3", "button4"],
};

function newGame() {
  game.score = 0;
  game.playerMoves = [];
  game.currentGame = [];
  turnNumber = 0;
  showScore();
  addTurn();
}

function showScore() {
  document.getElementById("score").innerText = game.score;
}

function addTurn() {
  game.playerMoves = []; //clear the playerMoves
  game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]);
  // we're going to push onto the computer game sequance, we're going to go to our game.choice key
  showTurns(); // which contains our four values. The IDs of our buttons. Use math random library  to generate a random number between 0 and 3
}

function lightsOn(circ) {
  document.getElementById(circ).classList.add("light");
  setTimeout(() => {
    document.getElementById(circ).classList.remove("light");
  }, 400);
}

function showTurns() {
  game.turnNumber = 0;
  let turns = setInterval(() => {
    lightsOn(game.currentGame[game.turnNumber]);
    game.turnNumber++;
    if (game.turnNumber >= game.currentGame.length) {
      clearInterval(turns);
    }
  }, 800);
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns }; // we'll exporting more than one object and fuction from this file so we need to put them in curly braces
