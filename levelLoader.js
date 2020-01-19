let levelOneInfo;

function loadLevelOne() {
  let request = new XMLHttpRequest();
  request.open("GET", "./gameFiles/levelOneCols.json", false);
  request.send(null);
  levelOneInfo = JSON.parse(request.responseText);
}
