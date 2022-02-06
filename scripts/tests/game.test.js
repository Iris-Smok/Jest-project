/**
 * @jest-environment jsdom
 */

const { game } = require("../game");

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
});
