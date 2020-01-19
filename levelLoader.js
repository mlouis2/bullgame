let levelInfo = [];

const NUM_LEVELS = 2;

function loadLevels() {
  loadLevelOne();
  loadLevelTwo();
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

function getDoorLocationAtLevel(level) {
  return levelInfo[level - 1].doorLocation;
}

function getPlayerStartLocationAtLevel(level) {
  return levelInfo[level - 1].playerStartLocation;
}

function getPlayerStartDirectionAtLevel(level) {
  return levelInfo[level - 1].playerStartDirection;
}
