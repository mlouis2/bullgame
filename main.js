const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function setBackground() {
  ctx.fillStyle = "#123456";
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerWidth * 0.8 * 0.75;
  console.log("canvas width is " + canvas.width);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

setBackground();
