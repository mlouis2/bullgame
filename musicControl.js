function playAndLoopMusic(delay = 0) {
  const backgroundMusic = new Audio("./music/background.mp3");
  backgroundMusic.play();
  backgroundMusic.currentTime = delay;
  backgroundMusic.loop = true;
}
