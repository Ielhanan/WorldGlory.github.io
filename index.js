gameArrey = [];
cards = [];
let var1;
let var2;
const sel = document.getElementById("cardsSelect");

let black = document.getElementById("blackButton");
let red = document.getElementById("redButton");
let above1 = document.getElementById("aboveButton1");
let below1 = document.getElementById("belowButton1");
let above2 = document.getElementById("aboveButton2");
let below2 = document.getElementById("belowButton2");
let between = document.getElementById("betweenButton");
let text = document.getElementById("text");
let cardsText = document.getElementById("cards");
let heart = document.getElementById("heartButton");
let diamond = document.getElementById("diamondButton");
let club = document.getElementById("clubButton");
let spade = document.getElementById("spadeButton");
let gameStart = document.getElementById("startButton");
let gloryButton = document.getElementById("gloryButton");
gameStart.addEventListener("click", choseColor);
/*chose color methode*/
function choseColor() {
  document.getElementById("startButton").style.visibility = "hidden";
  text.innerHTML = "Chose color";
  black.style.visibility = "visible";
  red.style.visibility = "visible";
  red.innerHTML = "red";
  black.innerHTML = "black";
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
  text.innerHTML = "Chose above or below";
  cardsText.innerHTML = "your cards :" + cards;
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
  text.innerHTML = "chose above below or between";
  cardsText.innerHTML = "your cards :" + cards;
  above2.innerHTML = "above";
  below2.innerHTML = "below";
  between.innerHTML = "between";
  above2.addEventListener("click", () => thirdFunct("above"));
  below2.addEventListener("click", () => thirdFunct("below"));
  between.addEventListener("click", () => thirdFunct("between"));
}

function thirdFunct(action) {
  above2.remove();
  below2.remove();
  between.remove();
  heart.style.visibility = "visible";
  diamond.style.visibility = "visible";
  club.style.visibility = "visible";
  spade.style.visibility = "visible";
  let x = drawCard();
  text.innerHTML = "chose shape";
  cardsText.innerHTML = "your cards :" + cards;
  heart.innerHTML = "heart";
  club.innerHTML = "club";
  spade.innerHTML = "spades";
  diamond.innerHTML = "diamond";
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

  heart.addEventListener("click", () => fourthFunct("heart"));
  diamond.addEventListener("click", () => fourthFunct("diamond"));
  club.addEventListener("click", () => fourthFunct("club"));
  spade.addEventListener("click", () => fourthFunct("spades"));
}

function fourthFunct(shape) {
  diamond.remove();
  heart.remove();
  club.remove();
  spade.remove();
  let x = drawCard();
  text.innerHTML = "chose card";
  cardsText.innerHTML = "your cards :" + cards;
  if (shape != x.Symbol) {
    gameOver();
  }

  document.getElementById("cardsSelect").style.visibility = "visible";
  gloryButton.visibility = "visible";
  gloryButton.innerHTML = "Submit";
}

function checkFinalResult() {
  gloryButton.remove();
  document.getElementById("cardsSelect").remove();
  creatNewCardList();

  debugger;
  console.log(sel);
  var option = sel.options[sel.selectedIndex].value;
  let x = drawCard();
  if (x.name == option) {
    wonWorldGlory();
  } else gameOver();
}

function checkDoubels(x) {
  let temp = x;
  while (x == gameArrey.slice(-1)[0]) {
    temp = drawCard();
  }
  return temp; //problem
}
function wonWorldGlory() {
  document.getElementById("finalResult").innerHTML = "YOU LOSE";
}
function gameOver() {
  document.getElementById("finalResult").innerHTML = "YOU LOSE";
  document.getElementById("newGame").style.visibility = "visible";
  document.getElementById("newGame").innerHTML = "new game";
  diamond.remove();
  heart.remove();
  club.remove();
  spade.remove();
  above2.remove();
  below2.remove();
  between.remove();
  above1.remove();
  below1.remove();
  black.remove();
  red.remove();
  gloryButton.remove();
  sel.remove();
  document.getElementById("newGame").addEventListener("click", () => {
    window.location.reload("Refresh");
  });
  gameArrey.pop();
}
function newGame() {
  window.location.reload("Refresh");
}

function creatNewCardList() {
  let max = initArrey.length - 1;

  for (var i = 0; i <= max; i++) {
    var opt = document.createElement("option");
    opt.value = initArrey[i].name;
    opt.innerHTML = initArrey[i].name;

    sel.appendChild(opt);
  }
}

/*this function draw a new card from deck and return it */
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
/*end of drawCard*/
