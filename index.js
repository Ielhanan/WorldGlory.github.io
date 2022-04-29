//check arrey
// for (let index = 0; index < 45; index++) {
//   initArrey.pop();
// }
// console.log(initArrey);

/*decleration about all elemnt in html will use in all functions 
cards arrey used to display the cards to user 
gameArrey is the drawed cards in the game */
choices = [];
gameArrey = [];
cards = [];
let choice;
let initArrey;
let var1;
let var2;

// Fetching API
const fetchDeck = async (apiData) => {
  let res = await fetch(
    "https://deckofcardsapi.com/api/deck/new/draw/?count=52"
  );
  const { cards } = await res.json();
  return cards.map((card) => apiData.push(card));
};
let sel = document.getElementById("cardsSelect");
const black = document.createElement("button");
const red = document.createElement("button");
const above1 = document.createElement("button");
const below1 = document.createElement("button");
const above2 = document.createElement("button");
const below2 = document.createElement("button");
const between = document.createElement("button");
const text = document.getElementById("text");
const cardsText = document.getElementById("cards");
const heart = document.createElement("button");
const diamond = document.createElement("button");
const club = document.createElement("button");
const spade = document.createElement("button");
const gameStart = document.getElementById("startButton");
const newGame = document.createElement("button");
let gloryButton = document.getElementById("gloryButton");
initArrey = [];
black.id = "black";
red.id = "red";
above1.id = "above1";
below1.id = "below1";
above2.id = "above2";
below2.id = "below2";
between.id = "between";
heart.id = "heart";
diamond.id = "diamond";
club.id = "club";
spade.id = "spade";
newGame.id = "newGame";
fetchDeck(initArrey);
gameStart.addEventListener("click", () => {
  makeShuffleSound();
  gameStart.remove();
  setTimeout(function () {
    choseColor();
  }, 2000);
});

/*chose color methode*/
function choseColor() {
  document.getElementById("div2").appendChild(black);
  document.getElementById("div2").appendChild(red);
  text.innerHTML = "Choose a color";
  // red.innerHTML = "Red";
  // black.innerHTML = "Black";
  black.addEventListener("click", () => {
    makeDrawSound();
    black.remove();
    red.remove();
    setTimeout(function () {
      startFunct("black");
    }, 1000);
  });

  red.addEventListener("click", () => {
    makeDrawSound();
    black.remove();
    red.remove();
    setTimeout(function () {
      startFunct("red");
    }, 1000);
  });
}

/*This function take care to draw first card and then to give player to chose above or below*/
function startFunct(color) {
  fixValues();
  choices.push(color);

  document.getElementById("div2").appendChild(above1);
  document.getElementById("div2").appendChild(below1);

  let x = drawCard();
  var1 = parseInt(x.value);
  text.innerHTML = "Choose above or below";
  // gameStart.style.marginTop = "0px";

  drawCardImage(cards);
  // document.getElementById("blankImage").remove();
  if (x.suit === "HEARTS" || x.suit === "DIAMONDS") choice = "red";
  else choice = "black";
  if (color !== choice) {
    /*check if player choice was right*/
    gameOver();
  }
  above1.innerHTML =
    ' <img src="images/above.png" style="height: 100%" width="100%" alt=""/>';
  below1.innerHTML =
    ' <img src="images/below.jpg" style="height: 100%" width="100%" alt=""/>';

  above1.addEventListener("click", () => {
    makeDrawSound();
    above1.remove();
    below1.remove();
    setTimeout(function () {
      secondFunct("above");
    }, 1000);
  });
  below1.addEventListener("click", () => {
    makeDrawSound();
    above1.remove();
    below1.remove();
    setTimeout(function () {
      secondFunct("below");
    }, 1000);
  });
}

/*This function take care to draw second card , check if he was right in previos choice 
  and then to give player to chose above or below or between*/
function secondFunct(action) {
  choices.push(action);
  document.getElementById("div2").appendChild(above2);
  document.getElementById("div2").appendChild(between);
  document.getElementById("div2").appendChild(below2);
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
  text.innerHTML = "Choose above, below or between";
  drawCardImage(cards);
  above2.innerHTML =
    ' <img src="images/above.png" style="height: 100%" width="100%" alt=""/>';
  below2.innerHTML =
    ' <img src="images/below.jpg" style="height: 100%" width="100%" alt=""/>';
  between.innerHTML =
    ' <img src="images/between.png" style="height: 100%" width="100%" alt=""/>';
  if (var1 == 14 || var2 == 14) {
    /*if var1 or var2 equal to 14 it says the cards was ace with value 14 ,
  player cant chose above */
    above2.remove();
    if (var1 == 2 || var2 == 2) {
      /*case when ace is 14 and 2 card is two*/
      below2.remove();
      between.style.width = "100%";
    } else {
      if (var1 - var2 == 1 || var2 - var1 == 1) {
        between.remove();
        below2.style.width = "100 %";
      } else {
        between.style.width = "50%";
        below2.style.width = "50%";
      }
    }
  }
  if (var1 == 1 || var2 == 1) {
    /*if var1 or var2 equal to 1 it says the cards was ace with value 1 ,
  player cant chose below */
    below2.remove();
    if (var1 == 13 || var2 == 13) {
      above2.remove();
      between.style.width = "100%";
    } else {
      if (var1 - var2 == 1 || var2 - var1 == 1) {
        between.remove();
        above2.style.width = "100%";
      } else {
        between.style.width = "50%";
        above2.style.width = "50%";
      }
    }
  }
  if (var1 - var2 == 1 || var2 - var1 == 1) {
    /*it says the both vars are successor so player cant chose between */
    between.remove();
    below2.style.width = "50%";
    above2.style.width = "50%";
  }
  above2.addEventListener("click", () => {
    makeDrawSound();
    above2.remove();
    below2.remove();
    between.remove();
    setTimeout(function () {
      thirdFunct("above");
    }, 1000);
  });
  below2.addEventListener("click", () => {
    makeDrawSound();
    above2.remove();
    below2.remove();
    between.remove();
    setTimeout(function () {
      thirdFunct("below");
    }, 1000);
  });

  between.addEventListener("click", () => {
    makeDrawSound();
    above2.remove();
    below2.remove();
    between.remove();
    setTimeout(function () {
      thirdFunct("between");
    }, 1000);
  });
}

/*Handle about stage 3, check if player guss before right , and creat choice about shape*/

function thirdFunct(action) {
  choices.push(action);

  document.getElementById("div2").appendChild(club);
  document.getElementById("div2").appendChild(heart);
  document.getElementById("div2").appendChild(spade);
  document.getElementById("div2").appendChild(diamond);
  let x = drawCard();
  x = checkDoubels(x); /*ignore cards when they the value is same*/
  text.innerHTML = "Choose a shape";
  drawCardImage(cards);
  heart.innerHTML =
    ' <img src="images/heart.png" style="height: 100%" width="100%" alt=""/>';
  club.innerHTML =
    ' <img src="images/club.png" style="height: 100%" width="100%" alt=""/>';
  spade.innerHTML =
    ' <img src="images/spades.jpg" style="height: 100%" width="100%" alt=""/>';
  diamond.innerHTML =
    ' <img src="images/diamond.jpg" style="height: 100%" width="100%" alt=""/>';
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

  heart.addEventListener("click", () => {
    makeDrawSound();
    diamond.remove();
    heart.remove();
    club.remove();
    spade.remove();
    setTimeout(() => {
      fourthFunct("HEARTS");
    }, 1000);
  });
  diamond.addEventListener("click", () => {
    makeDrawSound();
    diamond.remove();
    heart.remove();
    club.remove();
    spade.remove();
    setTimeout(() => {
      fourthFunct("DIAMONDS");
    }, 1000);
  });

  club.addEventListener("click", () => {
    makeDrawSound();
    diamond.remove();
    heart.remove();
    club.remove();
    spade.remove();
    setTimeout(() => {
      fourthFunct("CLUBS");
    }, 1000);
  });
  spade.addEventListener("click", () => {
    makeDrawSound();
    diamond.remove();
    heart.remove();
    club.remove();
    spade.remove();
    setTimeout(() => {
      fourthFunct("SPADES");
    }, 1000);
  });
}
/*Handle about stage 4 , check if player guss symbol right , and creat card list to chose final card*/
function fourthFunct(shape) {
  choices.push(shape);
  diamond.remove();
  heart.remove();
  club.remove();
  spade.remove();
  let x = drawCard();
  text.innerHTML = "Choose a card";
  drawCardImage(cards);
  if (shape != x.suit) {
    gameOver();
  }
  creatNewCardList();
  document.getElementById("div2").style.marginTop = "50px";
  sel.style.visibility = "visible";
  gloryButton.style.visibility = "visible";
  gloryButton.addEventListener("click", () => {
    makeDrawSound();
    gloryButton.remove();
    setTimeout(() => {
      checkFinalResult();
    }, 2000);
  });
}

/*last check at the game , if player guss the card right he win else lose */
function checkFinalResult() {
  var option = sel.options[sel.selectedIndex].label;
  let x = drawCard();
  drawCardImage(cards);
  choices.push(x.code);
  if (x.code == option) {
    wonWorldGlory();
  } else gameOver();
}
/*this function check if there is same card in row and draw new card if it same card
x is the value of privous card*/
function checkDoubels(x) {
  let temp = x;
  let varTemp = 100;

  if (var1 == 14 || var2 == 14) {
    varTemp = 1;
  }
  while (
    var1 == gameArrey.slice(-1)[0].value ||
    var2 == gameArrey.slice(-1)[0].value ||
    varTemp == gameArrey.slice(-1)[0].value
  ) {
    temp = drawCard();
  }
  return temp; //problem
}
function wonWorldGlory() {
  document.getElementById("finalResult").innerHTML =
    "YOU HAVE ATTAINED WORLD'S GLORY";
  text.remove;
}
/*Handle with all elemnt to display game over and remove other buttons expet new game button*/
function gameOver() {
  document.getElementById("div2").appendChild(newGame);
  document.getElementById("finalResult").innerHTML = "Better luck next time";
  document.getElementById("div2").style.marginTop = "41.5px";
  newGame.innerHTML = "TRY AGAIN";
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
  newGame.addEventListener("click", async () => {
    window.location.reload("Refresh");
    await fetchDeck(initArrey);
    fixValues();
    choseColor();
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

/*this function draw a new card from deck and return it */
function drawCard() {
  let x = initArrey[Math.floor(Math.random() * initArrey.length)]; //draw card
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

/*change arrey for work 
let check = [];
check = initArrey.slice(0, 5);
console.log(initArrey[0]);
*/

function makeShuffleSound() {
  randomSound = Math.floor(Math.random() * 10);
  var shuffle = new Audio("sounds/shuffle/shuff" + randomSound + ".aac");
  shuffle.play();
}

function makeDrawSound() {
  randomDrawSound = Math.floor(Math.random() * 27);
  var Draw = new Audio("sounds/draw/draw" + randomDrawSound + ".aac");
  Draw.play();
}
