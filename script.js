const xClass = "x";
const oClass = "o";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellEl = document.querySelectorAll("[data-cell]");
const boardEl = document.getElementById("board");
const winningMsgEl = document.getElementById("winning-msg");
const restartBtn = document.getElementById("winning-msg__btn");
const winningMsgTextEl = document.querySelector("[data-winning-msg-text]");
let oTurn;

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
  oTurn = false;
  // Why the need to assign a false value to oTurn? Isn't it already a falsy value?
  cellEl.forEach((cell) => {
    cell.classList.remove(xClass);
    cell.classList.remove(oClass);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  showHover();
  winningMsgEl.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? oClass : xClass;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurns();
    showHover();
  }
}

function endGame(draw) {
  if (draw) {
    winningMsgTextEl.textContent = "Draw!";
  } else {
    winningMsgTextEl.textContent = `${oTurn ? "O's" : "X's"} Wins!`;
  }
  winningMsgEl.classList.add("show");
}

function isDraw() {
  return [...cellEl].every((cell) => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurns() {
  oTurn = !oTurn;
}

function showHover() {
  boardEl.classList.remove(xClass);
  boardEl.classList.remove(oClass);
  if (oTurn) {
    boardEl.classList.add(oClass);
  } else {
    boardEl.classList.add(xClass);
  }
}

function checkWin(currentClass) {
  return winCombos.some((combo) => {
    return combo.every((index) => {
      return cellEl[index].classList.contains(currentClass);
    });
  });
}
// Why combo.every? Why cellEl[index].classList.contains(currentClass)?
// Can you change index to i?
