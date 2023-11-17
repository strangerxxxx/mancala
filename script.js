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
  handtext = document.getElementById("hand").textContent;
  const isFirst = handtext == "先手番";
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
  if (isFirst) {
    document.getElementById("hand").textContent = "後手番";
  } else {
    document.getElementById("hand").textContent = "先手番";
  }
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
  var hash = 0;
  var won = true;
  for (let i = 0; i < 3; i++) {
    box = document.getElementById("box-" + i);
    if (box.textContent != "0") {
      won = false;
      break;
    }
  }
  if (won) {
    document.getElementById("hand").textContent = "先手勝利";
    document.getElementById("score").textContent = "0手で先手勝利";
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
    document.getElementById("hand").textContent = "後手勝利";
    document.getElementById("score").textContent = "0手で後手勝利";
    document.getElementById("recommend").textContent = "推奨手 -";
    allDisabled();
    return true;
  }
  return false;
}
function scoreCheck() {
  var hash = 0;
  for (let i = 0; i < 3; i++) {
    box = document.getElementById("box-" + i);
    hash += Number(box.textContent) * 2 ** (i * 8);
  }
  for (let i = 4; i < 7; i++) {
    box = document.getElementById("box-" + i);
    hash += Number(box.textContent) * 2 ** ((i - 1) * 8);
  }
  handtext = document.getElementById("hand").textContent;
  const isFirst = handtext == "先手番";
  if (isFirst) {
    hash += 1 * 2 ** 48;
  }
  const arr = ["A", "B", "C", "", "D", "E", "F"];
  const score = Number(boardhash[hash][0]);
  const winner = "手で" + (score > 0 ? "先手勝利" : "後手勝利");
  const remain = 30000 - Math.abs(score);
  document.getElementById("score").textContent = remain + winner;
  document.getElementById("recommend").textContent =
    "推奨手 " + arr[boardhash[hash][1]];
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
  document.getElementById("hand").textContent = "先手番";
  document.getElementById("score").textContent = "19手で先手勝利";
  document.getElementById("recommend").textContent = "推奨手 A";
}
