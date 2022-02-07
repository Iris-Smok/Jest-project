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
  for (let circle of document.getElementsByClassName("circle")) {
    // loop through the classes
    if (circle.getAttribute("data-listener") !== "true") {
      // check the attribute of each circle and if attribute is set to false, then we will add our event listener
      circle.addEventListener("click", (e) => {
        if (game.currentGame.length > 0 && !game.turnInProgress) {
          // so if it's not true we will add addEventListener "click". We passed event object,click object as e
          let move = e.target.getAttribute("id"); // the reason we need e event object is that we're going to get our click targets ID (button1,button2,button3, depenets on which circle we click). We stored that in move variable
          game.lastButton = move;
          lightsOn(move); // call lights on with move
          game.playerMoves.push(move); // we'll push that move into our playerMOves
          playerTurn(); // and call our playerTurn fuction
        }
      });
      circle.setAttribute("data-listener", true); // after adding the event listener we can set the data listener attribute on our circle to true
    }
  }
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
  game.turnInProgress = true;
  game.turnNumber = 0;
  let turns = setInterval(() => {
    lightsOn(game.currentGame[game.turnNumber]);
    game.turnNumber++;
    if (game.turnNumber >= game.currentGame.length) {
      clearInterval(turns);
      game.turnInProgress = false;
    }
  }, 800);
}

function playerTurn() {
  let i = game.playerMoves.length - 1; // to get the index of the ast element from our playerMoves array.
  if (game.currentGame[i] === game.playerMoves[i]) {
    // We wanto to comapre that with the same index in the current game array, If our player gets answer correct then these two should match
    if (game.currentGame.length == game.playerMoves.length) {
      // if the length of our current game array is equal to the length of our player moves then we must be at the end of the swquance, adn the player got them all correct
      game.score++; // to increment the score
      showScore();
      addTurn();
    }
  } else {
    alert("Wrong move!");
    newGame();
  }
}

module.exports = {
  game,
  newGame,
  showScore,
  addTurn,
  lightsOn,
  showTurns,
  playerTurn,
}; // we'll exporting more than one object and fuction from this file so we need to put them in curly braces
