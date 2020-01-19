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
  console.log("pushing level one info");
  levelInfo.push(levelOneInfo);
}

function loadLevelTwo() {
  let request = new XMLHttpRequest();
  request.open("GET", "./gameFiles/levelOneCols.json", false);
  request.send(null);
  levelOneInfo = JSON.parse(request.responseText);
  console.log("pushing fake level two info");
  levelInfo.push(levelOneInfo);
}

function getDoorLocationAtLevel(level) {
  console.log(levelInfo);
  console.log(level - 1);
  return levelInfo[level - 1].doorLocation;
}

function getPlayerStartLocationAtLevel(level) {
  console.log("getting this");
  return levelInfo[level - 1].playerStartLocation;
}

function getPlayerStartDirectionAtLevel(level) {
  return levelInfo[level - 1].playerStartDirection;
}
