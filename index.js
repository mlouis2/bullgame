const score = document.getElementById("scoreText");

const ASPECT_RATIO = [16, 9];
const X_PERCENTAGE_OF_WINDOW = 0.7;
const Y_PERCENTAGE_OF_WINDOW = 0.9;

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
}

function loadGame() {
  location.href = "./game.html";
}

loadLevelOne();
drawTitleCard();

document.onkeydown = loadGame;
