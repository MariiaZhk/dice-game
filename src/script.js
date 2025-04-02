"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const winner0El = document.getElementById("winner--0");
const winner1El = document.getElementById("winner--1");

const WINNING_SCORE = 10;

let scores, currentScore, activePlayer, playing;

// Init

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  winner0El.classList.add("hidden");
  winner1El.classList.add("hidden");

  player0El.classList.remove("player--winner", "player--active");
  player1El.classList.remove("player--winner", "player--active");

  player0El.classList.add("player--active");
  btnRoll.disabled = false;
  btnHold.disabled = true;
};

init();

// Switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  player0El.classList.remove("player--active");
  player1El.classList.remove("player--active");

  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
  btnHold.disabled = true;
};

// Throw dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = `/src/img/dice-${dice}.png`;
    btnHold.disabled = false;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      btnHold.disabled = true;
      switchPlayer();
    }
  }
});

// Hold
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= WINNING_SCORE) {
      playing = false;
      diceEl.classList.add("hidden");

      //Winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      document
        .getElementById(`winner--${activePlayer}`)
        .classList.remove("hidden");
      btnHold.disabled = true;
      btnRoll.disabled = true;
    } else {
      diceEl.classList.add("hidden");
      switchPlayer();
    }
  }
});

// New game
btnNew.addEventListener("click", function () {
  init();
  diceEl.classList.add("hidden");
});
