function drawModel(gameStatus) {
  const modelWidth = canvas.width * 0.64;
  const modelHeight = canvas.height * 0.32;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(
    canvas.width * 0.05,
    10,
    canvas.width * 0.9,
    canvas.height * 0.9
  );
  ctx.fillStyle = "#000000";
  let endGameText = new Image();
  endGameText.src =
    gameStatus === 1 ? "./images/wonText.png" : "./images/lossText.png";
  endGameText.onload = function() {
    ctx.drawImage(endGameText, canvas.width * 0.1, 50, modelWidth * 0.95, 100);
  };
  document.onkeydown = refresh;
}

function refresh(e) {
  location.href = "./index.html";
}
