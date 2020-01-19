function drawModel(gameStatus) {
  const modelWidth = canvas.width * 0.64;
  const modelHeight = canvas.height * 0.32;
  console.log("loading model");
  ctx.fillStyle = "#ffffff";
  console.log("model width is " + canvas.width);
  console.log("canvas height is " + canvas.height);
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
  console.log("refreshing");
  location.href = "./index.html";
}
