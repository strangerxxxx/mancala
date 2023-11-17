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
function setRecommend(txt) {
  document.getElementById("recommend").textContent = "推奨手 " + txt;
}
function setDisabled(index, isDisable = true) {
  document.getElementById("button-" + index).disabled = isDisable;
}
function getNumber(index) {
  return Number(document.getElementById("box-" + index).textContent);
}
function setNumber(index, num) {
  document.getElementById("box-" + index).textContent = num;
}
function buttonClicked(index) {
  var number = getNumber(index);
  setNumber(index, 0);
  while (number > 0) {
    index = (index + 1) % 8;
    setNumber(index, getNumber(index) + 1);
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
    if (getNumber(i) == 0) {
      setDisabled(i, true);
    } else {
      setDisabled(i, isFirst);
    }
  }
  for (let i = 4; i < 7; i++) {
    if (getNumber(i) == 0) {
      setDisabled(i, true);
    } else {
      setDisabled(i, !isFirst);
    }
  }
  setFirst(!isFirst);
}
function zeroCheck() {
  const isFirst = getFirst();
  for (let i = 0; i < 3; i++) {
    if (!isFirst || getNumber(i) == 0) {
      setDisabled(i, true);
    } else {
      setDisabled(i, false);
    }
  }
  for (let i = 4; i < 7; i++) {
    if (isFirst || getNumber(i) == 0) {
      setDisabled(i, true);
    } else {
      setDisabled(i, false);
    }
  }
}
function winCheck() {
  var won = true;
  for (let i = 0; i < 3; i++) {
    boxNumber = getNumber(i);
    if (boxNumber != 0) {
      won = false;
      break;
    }
  }
  if (won) {
    setTurn("先手勝利");
    setScore(0, true);
    setRecommend("-");
    allDisabled();
    return true;
  }
  won = true;
  for (let i = 4; i < 7; i++) {
    boxNumber = getNumber(i);
    if (boxNumber != 0) {
      won = false;
      break;
    }
  }
  if (won) {
    setTurn("後手勝利");
    setScore(0, false);
    setRecommend("-");
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
    hash += getNumber(i) * mul;
    mul *= rate;
  }
  for (let i = 4; i < 7; i++) {
    hash += getNumber(i) * mul;
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
  const recommend =
    Number(boardhash[hash][1]) >= 0 ? arr[boardhash[hash][1]] : "-";
  setRecommend(recommend);
}
function allDisabled() {
  for (let i = 0; i < 3; i++) {
    setDisabled(i, true);
  }
  for (let i = 4; i < 7; i++) {
    setDisabled(i, true);
  }
}
function reset() {
  for (let i = 0; i < 3; i++) {
    setDisabled(i, false);
    setNumber(i, 3);
  }
  for (let i = 4; i < 7; i++) {
    setDisabled(i, true);
    setNumber(i, 3);
  }
  setNumber(3, 0);
  setNumber(7, 0);
  setFirst(true);
  scoreCheck();
}
