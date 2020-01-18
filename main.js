const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function setBackground() {
  ctx.fillStyle = "#123456";
  const defaultCanvasWidth = window.innerWidth * 0.8;
  canvas.width = defaultCanvasWidth;
  const adjustedCanvasHeight = defaultCanvasWidth / 16 * 9; // 16:9 aspect ratio
  if (window.innerHeight < adjustedCanvasHeight) {
    const defaultCanvasHeight = window.innerHeight * 0.9;
    canvas.height = defaultCanvasHeight;
    canvas.width = defaultCanvasHeight * 16 / 9;
  } else {
    canvas.height = adjustedCanvasHeight;
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

setBackground();
