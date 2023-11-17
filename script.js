var history = [];
function getFirst() {
  return document.getElementById("hand").textContent == "先手番";
}
function setTurn(str) {
  document.getElementById("hand").textContent = str;
}
function setFirst(isFirst = true) {
  setTurn(isFirst ? "先手番" : "後手番");
}
function setScore(remain, firstWin = true) {
  document.getElementById("score").textContent =
    remain + "手で" + (firstWin ? "先手" : "後手") + "勝利";
}
function buttonClicked(index) {
  var element = document.getElementById("box-" + index);
  number = element.textContent;
  document.getElementById("box-" + index).textContent = 0;
  while (number > 0) {
    index = (index + 1) % 8;
    document.getElementById("box-" + index).textContent =
      Number(document.getElementById("box-" + index).textContent) + 1;
    number--;
  }
  if (winCheck()) {
    return;
  }
  if (index % 4 != 3) {
    changeTurn();
  } else {
    zeroCheck();
  }
  scoreCheck();
}
function changeTurn() {
  const isFirst = getFirst();
  for (let i = 0; i < 3; i++) {
    box = document.getElementById("box-" + i);
    button = document.getElementById("button-" + i);
    if (box.textContent == "0") {
      button.disabled = true;
    } else {
      button.disabled = isFirst;
    }
  }
  for (let i = 4; i < 7; i++) {
    box = document.getElementById("box-" + i);
    button = document.getElementById("button-" + i);
    if (box.textContent == "0") {
      button.disabled = true;
    } else {
      button.disabled = !isFirst;
    }
  }
  setFirst(!isFirst);
}
function zeroCheck() {
  for (let i = 0; i < 3; i++) {
    box = document.getElementById("box-" + i);
    button = document.getElementById("button-" + i);
    if (box.textContent == "0") {
      button.disabled = true;
    }
  }
  for (let i = 4; i < 7; i++) {
    box = document.getElementById("box-" + i);
    button = document.getElementById("button-" + i);
    if (box.textContent == "0") {
      button.disabled = true;
    }
  }
}
function winCheck() {
  var won = true;
  for (let i = 0; i < 3; i++) {
    box = document.getElementById("box-" + i);
    if (box.textContent != "0") {
      won = false;
      break;
    }
  }
  if (won) {
    setTurn("先手勝利");
    setScore(0, true);
    document.getElementById("recommend").textContent = "推奨手 -";
    allDisabled();
    return true;
  }
  won = true;
  for (let i = 4; i < 7; i++) {
    box = document.getElementById("box-" + i);
    if (box.textContent != "0") {
      won = false;
      break;
    }
  }
  if (won) {
    setTurn("後手勝利");
    setScore(0, false);
    document.getElementById("recommend").textContent = "推奨手 -";
    allDisabled();
    return true;
  }
  return false;
}
function getHash() {
  var hash = 0;
  var mul = 1;
  const rate = 256;
  for (let i = 0; i < 3; i++) {
    box = document.getElementById("box-" + i);
    hash += Number(box.textContent) * mul;
    mul *= rate;
  }
  for (let i = 4; i < 7; i++) {
    box = document.getElementById("box-" + i);
    hash += Number(box.textContent) * mul;
    mul *= rate;
  }
  const isFirst = getFirst();
  if (isFirst) {
    hash += mul;
  }
  return hash;
}
function scoreCheck() {
  const hash = getHash();
  const arr = ["A", "B", "C", "", "D", "E", "F"];
  const score = Number(boardhash[hash][0]);
  setScore(30000 - Math.abs(score), score > 0);
  const recomend =
    Number(boardhash[hash][1]) >= 0 ? arr[boardhash[hash][1]] : "-";
  document.getElementById("recommend").textContent = "推奨手 " + recomend;
}
function allDisabled() {
  for (let i = 0; i < 3; i++) {
    document.getElementById("button-" + i).disabled = true;
  }
  for (let i = 4; i < 7; i++) {
    document.getElementById("button-" + i).disabled = true;
  }
}
function reset() {
  for (let i = 0; i < 3; i++) {
    document.getElementById("button-" + i).disabled = false;
    document.getElementById("box-" + i).textContent = 3;
  }
  for (let i = 4; i < 7; i++) {
    document.getElementById("button-" + i).disabled = true;
    document.getElementById("box-" + i).textContent = 3;
  }
  document.getElementById("box-3").textContent = 0;
  document.getElementById("box-7").textContent = 0;
  setFirst(true);
  scoreCheck();
}
