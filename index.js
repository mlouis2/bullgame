const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const score = document.getElementById("scoreText");

const ASPECT_RATIO = [16, 9];
const X_PERCENTAGE_OF_WINDOW = 0.7;
const Y_PERCENTAGE_OF_WINDOW = 0.9;

function setBackground() {
  ctx.fillStyle = "#123456";
  const defaultCanvasWidth = window.innerWidth * X_PERCENTAGE_OF_WINDOW;
  canvas.width = defaultCanvasWidth;
  const adjustedCanvasHeight =
    (defaultCanvasWidth / ASPECT_RATIO[0]) * ASPECT_RATIO[1]; // 16:9 aspect ratio
  if (window.innerHeight < adjustedCanvasHeight) {
    const defaultCanvasHeight = window.innerHeight * Y_PERCENTAGE_OF_WINDOW;
    canvas.height = defaultCanvasHeight;
    canvas.width = (defaultCanvasHeight * ASPECT_RATIO[0]) / ASPECT_RATIO[1];
  } else {
    canvas.height = adjustedCanvasHeight;
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  scoreText.style.marginLeft = canvas.offsetLeft;
}

setBackground();
