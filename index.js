gameArrey = [];
cards = [];
let var1;
let var2;

// let index = initArrey.findIndex((x) => {
//   return x.name == cards.slice(-1)[0];
// });
// initArrey.splice(index, 1);
console.log(initArrey);
let black = document.getElementById("blackButton");
let red = document.getElementById("redButton");
let above1 = document.getElementById("aboveButton1");
let below1 = document.getElementById("belowButton1");
let above2 = document.getElementById("aboveButton2");
let below2 = document.getElementById("belowButton2");
let between = document.getElementById("betweenButton");

var gameStart = document.getElementById("startButton");
gameStart.addEventListener("click", choseColor);
/*chose color methode*/
function choseColor() {
  document.getElementById("startButton").style.visibility = "hidden";
  document.getElementById("text").innerHTML = "Chose color";
  black.innerHTML = "Black";
  red.innerHTML = "Red";
  black.style.visibility = "visible";
  red.style.visibility = "visible";
  black.addEventListener("click", startFunct.bind(this, "black"));
  red.addEventListener("click", startFunct.bind(this, "red"));
}
/*This function take care to draw first card and then to give player to chose above or below*/
function startFunct(color) {
  black.remove();
  red.remove();
  above1.style.visibility = "visible";
  below1.style.visibility = "visible";
  let x = drawCard();
  console.log(x);
  var1 = x.value;
  document.getElementById("text").innerHTML = "Chose above or below";
  document.getElementById("text").innerHTML = "your cards :" + cards;
  if (color != x.color) {
    gameOver();
  }
  console.log(cards);
  above1.innerHTML = "above";
  below1.innerHTML = "below";
  above1.addEventListener("click", secondFunct.bind(this, "above"));
  below1.addEventListener("click", secondFunct.bind(this, "below"));
}

/*This function take care to draw second card , check if he was right in previos choice 
  and then to give player to chose above or below or between*/
function secondFunct(action) {
  above1.remove();
  below1.remove();
  above2.style.visibility = "visible";
  below2.style.visibility = "visible";
  between.style.visibility = "visible";
  let temp = gameArrey.slice(-1)[0].value;
  let x = drawCard();
  // x = checkDoubels(x);
  var2 = x.value;
  if (action == "above") {
    if (x.value < temp) {
      gameOver();
    }
  } else if (action == "below") {
    if (x.value > temp) {
      gameOver();
    }
  }
  below2.innerHTML = "below";
  above2.innerHTML = "above";
  between.innerHTML = "between";
  document.getElementById("text").innerHTML = "your cards :" + cards;
  above2.addEventListener("click", () => thirdFunct("above"));
  below2.addEventListener("click", () => thirdFunct("below"));
  between.addEventListener("click", () => thirdFunct("between"));
}

function thirdFunct(action) {
  above2.remove();
  below2.remove();
  between.remove();
  let x = drawCard();
  if (action == "above") {
    if (x.value < var2 || x.value < var1) {
      gameOver();
    }
  } else if (action == "below") {
    if (x.value > var2 || x.value > var1) {
      gameOver();
    }
  } else if (action == "between") {
    if (
      !(
        (x.value > var1 && x.value < var2) ||
        (x.value > var2 && x.value < var1)
      )
    ) {
      gameOver();
    }
  }

  alert("all good");
}

function checkDoubels(x) {
  let temp = x;
  while (x == gameArrey.slice(-1)[0]) {
    temp = drawCard();
  }
  return temp; //problem
}

function gameOver() {
  document.getElementById("finalResult").innerHTML = "YOU LOSE";
}

function drawCard() {
  let x = initArrey[Math.floor(Math.random() * initArrey.length)]; //draw card
  gameArrey.push(x);
  cards.push(x.name);
  let index = initArrey.findIndex((x) => {
    return x.name == cards.slice(-1)[0];
  });
  initArrey.splice(index, 1);

  return x;
}
