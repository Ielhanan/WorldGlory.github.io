/*decleration about all elemnt in html will use in all functions 
cards arrey used to display the cards to user 
gameArrey is the drawed cards in the game */

gameArrey = [];
cards = [];
let choice;
let initArrey;
let var1;
let var2;
let sel = document.getElementById("cardsSelect");
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
gameStart.addEventListener("click", async () => {
  initArrey = [];
  await fetchDeck(initArrey);
  console.log(initArrey);
  fixValues();
  choseColor();
});
/*chose color methode*/

console.log(initArrey);
function choseColor() {
  document.getElementById("startButton").style.visibility = "hidden";
  text.innerHTML = "Chose color";
  black.style.visibility = "visible";
  red.style.visibility = "visible";
  red.innerHTML = "red";
  black.innerHTML = "black";
  black.addEventListener("click", () => {
    startFunct("black");
  });
  red.addEventListener("click", () => {
    startFunct("red");
  });
}

/*This function take care to draw first card and then to give player to chose above or below*/
function startFunct(color) {
  black.remove();
  red.remove();
  above1.style.visibility = "visible";
  below1.style.visibility = "visible";
  let x = drawCard();
  var1 = parseInt(x.value);
  text.innerHTML = "Chose above or below";
  drawCardImage(cards);
  console.log(x);
  if (x.suit === "HEARTS" || x.suit === "DIAMONDS") choice = "red";
  else choice = "black";
  if (color !== choice) {
    /*check if player choice was right*/
    gameOver();
  }
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
  x = checkDoubels(x);
  var2 = parseInt(x.value);
  if (action === "above") {
    if (var2 === 1) {
      /*if var2 =1 so we draw ace , player chose above so ace value is 14*/
      var2 = 14;
    }
    if (var2 < var1) {
      gameOver();
    }
  } else if (action == "below") {
    if (var1 === 1) {
      /*the first card was ace and player chose below so ace value is 14*/
      var1 = 14;
    }
    if (var2 > var1) {
      gameOver();
    }
  }
  text.innerHTML = "chose above below or between";
  drawCardImage(cards);
  above2.innerHTML = "above";
  below2.innerHTML = "below";
  between.innerHTML = "between";
  if (var1 + var2 == 27) {
    /*if var1+var2=27 it says the cards was king +ace with value 14 ,
  player cant chose above */
    above2.remove();
    between.remove();
  }
  if (var1 + var2 == 3) {
    /*if var1+var2=27 it says the cards was two +ace with value 1 ,
  player cant chose below  */
    below2.remove();
    between.remove();
  }
  if (var1 - var2 == 1 || var2 - var1 == 1) {
    /*it says the both vars are successor so player cant chose between */
    between.remove();
  }
  above2.addEventListener("click", () => thirdFunct("above"));
  below2.addEventListener("click", () => thirdFunct("below"));
  between.addEventListener("click", () => thirdFunct("between"));
}

/*Handle about stage 3, check if player guss before right , and creat choice about shape*/

function thirdFunct(action) {
  above2.remove();
  below2.remove();
  between.remove();
  heart.style.visibility = "visible";
  diamond.style.visibility = "visible";
  club.style.visibility = "visible";
  spade.style.visibility = "visible";
  let x = drawCard();
  x = checkDoubels(x); /*ignore cards when they the value is same*/
  text.innerHTML = "chose shape";
  drawCardImage(cards);
  heart.innerHTML = "♥️";
  club.innerHTML = "♣️";
  spade.innerHTML = "♠️";
  diamond.innerHTML = "♦️";
  if (action == "above") {
    if (x.value === "1") {
      /*the current card is ace we chose above so ace is 14 value*/
      x.value = "14";
    }
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

  heart.addEventListener("click", () => fourthFunct("HEARTS"));
  diamond.addEventListener("click", () => fourthFunct("DIAMONDS"));
  club.addEventListener("click", () => fourthFunct("CLUBS"));
  spade.addEventListener("click", () => fourthFunct("SPADES"));
}
/*Handle about stage 4 , check if player guss symbol right , and creat card list to chose final card*/
function fourthFunct(shape) {
  diamond.remove();
  heart.remove();
  club.remove();
  spade.remove();
  let x = drawCard();
  text.innerHTML = "chose card";
  drawCardImage(cards);
  if (shape != x.suit) {
    gameOver();
  }
  creatNewCardList();
  sel.style.visibility = "visible";
  gloryButton.style.visibility = "visible";
  gloryButton.innerHTML = "Submit";
}

/*last check at the game , if player guss the card right he win else lose */
function checkFinalResult() {
  gloryButton.remove();
  document.getElementById("cardsSelect").remove();
  var option = sel.options[sel.selectedIndex].value;
  let x = drawCard();
  drawCardImage(cards);

  if (x.code == option) {
    wonWorldGlory();
  } else gameOver();
}
/*this function check if there is same card in row and draw new card if it same card
x is the value of privous card*/
function checkDoubels(x) {
  let temp = x;
  while (
    var1 == gameArrey.slice(-1)[0].value ||
    var2 == gameArrey.slice(-1)[0].value
  ) {
    temp = drawCard();
  }
  return temp; //problem
}
function wonWorldGlory() {
  document.getElementById("finalResult").innerHTML = "YOU WIN";
}
/*Handle with all elemnt to display game over and remove other buttons expet new game button*/
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
  text.remove();
  gloryButton.remove();
  sel.remove();
  document.getElementById("newGame").addEventListener("click", () => {
    window.location.reload("Refresh");
  });
}

/*this function creat the current cards left to chose in last stage*/
function creatNewCardList() {
  let max = initArrey.length - 1;

  for (var i = 0; i <= max; i++) {
    var opt = document.createElement("option");
    opt.value = initArrey[i].value;
    opt.innerHTML = initArrey[i].code;

    sel.appendChild(opt);
  }
}

// Fetching API
const fetchDeck = async (apiData) => {
  let res = await fetch(
    "https://deckofcardsapi.com/api/deck/new/draw/?count=52"
  );
  const { cards } = await res.json();
  return cards.map((card) => apiData.push(card));
};

/*this function draw a new card from deck and return it */
function drawCard() {
  let x = initArrey[Math.floor(Math.random() * initArrey.length)]; //draw card
  console.log(x);
  gameArrey.push(x);
  cards.push(x);
  let index = initArrey.findIndex((x) => {
    return x.code == cards.slice(-1)[0].code;
  });
  initArrey.splice(index, 1);

  return x;
}
/*end of drawCard*/

function drawCardImage(cards, start) {
  cards.forEach((card) => {
    cardsText.innerHTML += `
        <img class="card" src="${card.image}" alt="${card.suit}"/>
      `;
  });
  cards.splice(0, cards.length);
}

function fixValues() {
  initArrey.forEach((card) => {
    if (card.value === "ACE") {
      card.value = "1";
    }
    if (card.value === "JACK") {
      card.value = "11";
    }
    if (card.value === "QUEEN") {
      card.value = "12";
    }
    if (card.value === "KING") {
      card.value = "13";
    }
  });
}
