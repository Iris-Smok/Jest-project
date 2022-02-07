/**
 * @jest-environment jsdom
 */

const { TestWatcher } = require("jest");
const {
  game,
  newGame,
  showScore,
  addTurn,
  lightsOn,
  showTurns,
} = require("../game");

// function to load index.html file into the DOM
beforeAll(() => {
  let fs = require("fs");
  let fileContents = fs.readFileSync("index.html", "utf-8");
  document.open();
  document.write(fileContents);
  document.close();
});

describe("game object contains correct keys", () => {
  test("score key exists", () => {
    expect("score" in game).toBe(true);
  });
  test("currentGame key exists", () => {
    expect("currentGame" in game).toBe(true);
  });
  test("playerMoves key exists", () => {
    expect("playerMoves" in game).toBe(true);
  });
  test("choices key exists", () => {
    expect("choices" in game).toBe(true);
  });
  test("choices containes correct id's", () => {
    expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]); //we're picking out the choices key from our game object.
  }); // we used Jest to equal matcher and we expect the array values od button1...
  test("turn number key exists", () => {
    expect("turnNumber" in game).toBe(true);
  });
});

describe("newGame works correctly", () => {
  beforeAll(() => {
    // beforeAll runs before all of the test
    //beforeAll function because we want to set the game state with some fake values to see if the newGame function resets them
    game.score = 42;
    game.playerMoves = ["button1", "button2"];
    game.currentGame = ["button1", "button2"];
    game.turnNumber = 2;
    document.getElementById("score").innertext = "42";
    newGame();
  });
  test("should set game score to zero", () => {
    expect(game.score).toEqual(0);
  });
  test("should be one move in the computer's game array", () => {
    expect(game.currentGame.length).toBe(1);
  });

  test("should clear the currentGame array", () => {
    expect(game.currentGame.length).toBe(1); // you can use toEqual as well
  });
  test("should set turnNumber to zero", () => {
    expect(game.turnNumber).toBe(0);
  });
  test("should display 0 for the element with an id of score", () => {
    expect(document.getElementById("score").innerText).toEqual(0);
  });
  test("expect data-listener to be tru", () => {
    const elements = document.getElementsByClassName("circle"); // to get all of the elements which have the class of circle, store them in the constant
    for (let element of elements) {
      // loop through each of these elements
      expect(element.getAttribute("data-listener")).toEqual("true"); // expect  that the attribute of that element(circle) the data listener attribute is set to true
    }
  });
});

describe("gameplay works correctly", () => {
  beforeEach(() => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    addTurn();
  });
  afterEach(() => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
  });
  test("addTurn adds a new turn to the game", () => {
    addTurn();
    expect(game.currentGame.length).toBe(2);
  });
  test("should add correct class to Light up the buttons", () => {
    // to check is correct class has been added to our button to light ip up,we'll go for the first element in the currentGame array because we know there'll always be at least one element there
    let button = document.getElementById(game.currentGame[0]); // get one of the IDs from currentGame array and assign it to a varible
    lightsOn(game.currentGame[0]); // and call lightOn function
    expect(button.classList).toContain("light");
  });
  test("showTurns should update game.turnNumber", () => {
    game.turnNumber = 42;
    showTurns();
    expect(game.turnNumber).toBe(0);
  });
});
