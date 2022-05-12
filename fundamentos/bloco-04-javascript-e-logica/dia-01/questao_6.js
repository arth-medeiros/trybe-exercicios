const chessPiece = require("readLine");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What is the chess piece?", function (chessPiece) { 
  console.log(`${answer}`);
  rl.close();
});

chessPiece = chessPiece.toLowerCase();

switch (chessPiece) {
  case "king":
    console.log("one square, any direction");
    break;
  case "queen":
    console.log("any direction");
    break;
  case "bishop":
    console.log("diagonals");
    break;
  case "knight":
    console.log("three quares vertical, one horizontal and vice-versa");
    break;
  case "tower":
    console.log("horizontals and verticals");
    break;
  case "pawn":
    console.log("one square forward");
    break;
  default:
    console.log("error: not a chess piece");
}