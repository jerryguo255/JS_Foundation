'use strict';

const dice = document.querySelector('.dice');
const player1EarnedScoreEl = document.getElementById('score--0');
const player2EarnedScoreEl = document.getElementById('score--1');
const player1CurrentScoreEl = document.getElementById('current--0');
const player2CurrentScoreEl = document.getElementById('current--1');

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

// the swithUser function will return which user  switch from
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

document.querySelector('.btn--new').addEventListener('click', function () {});

// Roll Dice BUTTONclick
document.querySelector('.btn--roll').addEventListener('click', function () {
  const rollScore = rollDice();
  if (user1Actived) {
    if (rollScore === 1) {
      user1CurrentScore = 0;
      switchUser();
    } else {
      user1CurrentScore += rollScore;
    }
    player1CurrentScore.textContent = user1CurrentScore + user1EarnedScore;
  } else {
    if (rollScore === 1) {
      user2CurrentScore = 0;
      switchUser();
    } else {
      user2CurrentScore += rollScore;
    }
    player2CurrentScore.textContent = user2CurrentScore + user2EarnedScore;
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (user1Actived) {
    user1EarnedScore += user1CurrentScore;
    player1CurrentScore.textContent = user1EarnedScore;
    if (user1EarnedScore > targetScore) {
      console.log('player1 win');
    }
    switchUser();
  } else {
    user2EarnedScore += user2CurrentScore;
    player2CurrentScore.textContent = user2EarnedScore;
    if (user2EarnedScore > targetScore) {
      console.log('player2 win');
    }
    switchUser();
  }
});
