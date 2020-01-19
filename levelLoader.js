let levelInfo = [];

const NUM_LEVELS = 3;

function loadLevels() {
  loadLevelOne();
  loadLevelTwo();
  loadLevelThree();
}

function loadLevelOne() {
  let request = new XMLHttpRequest();
  request.open("GET", "./gameFiles/levelOneCols.json", false);
  request.send(null);
  levelOneInfo = JSON.parse(request.responseText);
  levelInfo.push(levelOneInfo);
}

function loadLevelTwo() {
  let request = new XMLHttpRequest();
  request.open("GET", "./gameFiles/levelTwoCols.json", false);
  request.send(null);
  levelTwoInfo = JSON.parse(request.responseText);
  levelInfo.push(levelTwoInfo);
}

function loadLevelThree() {
  let request = new XMLHttpRequest();
  request.open("GET", "./gameFiles/levelThreeCols.json", false);
  request.send(null);
  levelThreeInfo = JSON.parse(request.responseText);
  levelInfo.push(levelThreeInfo);
}

function getDoorLocationAtLevel(level) {
  return levelInfo[level - 1].doorLocation;
}

function getPlayerStartLocationAtLevel(level) {
  return levelInfo[level - 1].playerStartLocation;
}

function getPlayerStartDirectionAtLevel(level) {
  return levelInfo[level - 1].playerStartDirection;
}
