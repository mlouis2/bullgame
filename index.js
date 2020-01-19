const highScoreText = document.getElementById("highScore");
const highScore = document.getElementById("highScoreText");

const ASPECT_RATIO = [16, 9];
const X_PERCENTAGE_OF_WINDOW = 0.7;
const Y_PERCENTAGE_OF_WINDOW = 0.9;

const localStorage = window.localStorage;

function drawTitleCard() {
  const titleCard = document.getElementById("titleCard");
  const defaultCanvasWidth = window.innerWidth * X_PERCENTAGE_OF_WINDOW;
  titleCard.width = defaultCanvasWidth;
  const adjustedCanvasHeight =
    (defaultCanvasWidth / ASPECT_RATIO[0]) * ASPECT_RATIO[1]; // 16:9 aspect ratio
  if (window.innerHeight < adjustedCanvasHeight) {
    const defaultCanvasHeight = window.innerHeight * Y_PERCENTAGE_OF_WINDOW;
    titleCard.height = defaultCanvasHeight;
    titleCard.width = (defaultCanvasHeight * ASPECT_RATIO[0]) / ASPECT_RATIO[1];
  } else {
    titleCard.height = adjustedCanvasHeight;
  }
  highScore.style.marginLeft = titleCard.offsetLeft;
  if (localStorage.getItem("highScore")) {
    highScoreText.innerHTML = localStorage.getItem("highScore");
  }
}

function loadGame() {
  location.href = "./game.html";
}

loadLevels();
drawTitleCard();

document.onkeydown = loadGame;
