gameArrey = [];
cards = [];
var gameStart = document.getElementById("startButton");
gameStart.addEventListener("click", choseColor);
/*chose color methode*/
function choseColor() {
  document.getElementById("startButton").remove();
  document.getElementById("text").innerHTML = "Chose color";
  document.getElementById("secondButton").innerHTML = "Black";
  document.getElementById("firstButton").innerHTML = "Red";
  document
    .getElementById("secondButton")
    .addEventListener("click", startFunct.bind(this, "black"));

  document
    .getElementById("firstButton")
    .addEventListener("click", startFunct.bind(this, "red"));
}
/*This function take care to draw first card and then to give player to chose above or below*/
function startFunct(color) {
  let x = initArrey[Math.floor(Math.random() * initArrey.length)]; //draw card
  console.log(x);
  gameArrey.push(x);
  cards.push(x.name);
  if (color != x.color) {
    gameOver();
  }
  document.getElementById("text").innerHTML = "Chose above or below";
  document.getElementById("text").innerHTML = "your cards :" + cards;
  let above = document.getElementById("firstButton");
  let below = document.getElementById("secondButton");
  above.innerHTML = "above";
  below.innerHTML = "below";
  above.addEventListener("click", secondFunct.bind(this, "above"));
  below.addEventListener("click", secondFunct.bind(this, "below"));
}

/*This function take care to draw second card , check if he was right in previos choice 
  and then to give player to chose above or below or between*/
function secondFunct(action) {
  console.log("we in second funct");
  let temp = gameArrey.slice(-1)[0].value;
  let x = initArrey[Math.floor(Math.random() * initArrey.length)]; //draw card
  console.log(x);
  gameArrey.push(x);
  cards.push(x.name);
  // checkDoubels(x);
  if (action == "above") {
    if (gameArrey.slice(-1)[0].value > temp) {
      gameOver();
    }
  } else if (action == "below") {
    if (gameArrey.slice(-1)[0].value < temp) {
      gameOver();
    }
  }
  let above = document.getElementById("firstButton");
  let below = document.getElementById("secondButton");
  let between = document.getElementById("thirdButton");
  between.innerHTML = "between";
  above.addEventListener("click", () => thirdFunct("above"));
  below.addEventListener("click", () => thirdFunct("below"));
  between.addEventListener("click", () => thirdFunct("between"));
}
function thirdFunct(action) {
  alert("all good");
}

// function checkDoubels(x) {
//   debugger;
//   while (x == gameArrey.slice(-1)[0]) {
//     log("ok")
//     x = initArrey[Math.floor(Math.random() * initArrey.length)];
//     gameArrey.push(x);
//     cards.pus(x.name);
//   }
// }

function gameOver() {
  document.getElementById("finalResult").innerHTML = "YOU LOSE";
  alert("game over");
}
