'use strict';

const dice = document.querySelector('.dice');
const player1EarnedScoreEl = document.getElementById('score--0');
const player2EarnedScoreEl = document.getElementById('score--1');
const player1CurrentScoreEl = document.getElementById('current--0');
const player2CurrentScoreEl = document.getElementById('current--1');

const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player1Section = document.querySelector('.player--0');
const player2Section = document.querySelector('.player--1');
const targetScore = 30;
let user1CurrentScore = 0;
let user2CurrentScore = 0;
let user1EarnedScore = 0;
let user2EarnedScore = 0;
let user1Actived = true;

const manipulateClassList = function (element, operation, className) {
  switch (operation) {
    case 'add':
      element.classList.add(className);
      break;
    case 'remove':
      element.classList.remove(className);
      break;
  }
};

const rollDice = function () {
  const aRollNumber = Math.trunc(Math.random() * 6 + 1);
  dice.src = `dice-${aRollNumber}.png`;
  return aRollNumber;
};

const switchUser = function () {
  if (player1Section.classList.contains('player--active')) {
    manipulateClassList(player1Section, 'remove', 'player--active');
    manipulateClassList(player2Section, 'add', 'player--active');
    user1Actived = false;
  } else {
    player1Section.classList.add('player--active');
    player2Section.classList.remove('player--active');
    user1Actived = true;
  }
};

const rolldiceBtnEventHandler = function () {
  const rollScore = rollDice();
  //check which user it is ， if it‘s user 1
  if (user1Actived) {
    //if dice point is 1 , lose all current score and switch another user
    if (rollScore === 1) {
      user1CurrentScore = 0;
      switchUser();
    } else {
      //add up score
      user1CurrentScore += rollScore;
    }
    player1CurrentScoreEl.textContent = user1CurrentScore;
  }
  //if it‘s user 2
  else {
    if (rollScore === 1) {
      user2CurrentScore = 0;
      switchUser();
    } else {
      user2CurrentScore += rollScore;
    }
    player2CurrentScoreEl.textContent = user2CurrentScore;
  }
};

const holdBtnClickEventHandler = function () {
  //if it‘s user 1
  if (user1Actived) {
    user1EarnedScore += user1CurrentScore;
    player1EarnedScoreEl.textContent = user1EarnedScore;
    user1CurrentScore = 0;
    player1CurrentScoreEl.textContent = 0;
    //the condition of win the game
    if (user1EarnedScore >= targetScore) {
      player1Section.classList.add('player--winner');
      btnRollDice.removeEventListener('click', rolldiceBtnEventHandler);
      btnHold.removeEventListener('click', holdBtnClickEventHandler);
    } else {
      switchUser();
    }
  } else {
    user2EarnedScore += user2CurrentScore;
    player2EarnedScoreEl.textContent = user2EarnedScore;
    user2CurrentScore = 0;
    player2CurrentScoreEl.textContent = 0;
    if (user2EarnedScore >= targetScore) {
      player2Section.classList.add('player--winner');
      btnRollDice.removeEventListener('click', rolldiceBtnEventHandler);
      btnHold.removeEventListener('click', holdBtnClickEventHandler);
    } else {
      switchUser();
    }
  }
};
// Roll Dice BUTTONclick
btnRollDice.addEventListener('click', rolldiceBtnEventHandler);

// HOLD BUTTON clicked
btnHold.addEventListener('click', holdBtnClickEventHandler);

//reset the game
document.querySelector('.btn--new').addEventListener('click', function () {
  player1CurrentScoreEl.textContent = 0;
  player2CurrentScoreEl.textContent = 0;
  player1EarnedScoreEl.textContent = 0;
  player2EarnedScoreEl.textContent = 0;
  user1CurrentScore = 0;
  user2CurrentScore = 0;
  user1EarnedScore = 0;
  user2EarnedScore = 0;
  // Roll Dice BUTTONclick
  btnRollDice.addEventListener('click', rolldiceBtnEventHandler);

  // HOLD BUTTON clicked
  btnHold.addEventListener('click', holdBtnClickEventHandler);
  player1Section.classList.remove('player--winner');
  player2Section.classList.remove('player--winner');

  //always player 1 first for new game
  if (!user1Actived) {
    switchUser();
  }
});
