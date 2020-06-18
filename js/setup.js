'use strict';
var PLAYERS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIERBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setupBlock = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var popupEscHandler = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setupBlock.classList.remove('hidden');

  document.addEventListener('keydown', popupEscHandler);
};

var closePopup = function () {
  setupBlock.classList.add('hidden');

  document.removeEventListener('keydown', popupEscHandler);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    closePopup();
  }
});

var playerCoat = document.querySelector('.setup-wizard .wizard-coat');
var coatField = document.querySelector('.custom-coat');
var currentCoat = document.querySelector('.wizard-coat');

var playerEyes = document.querySelector('.setup-wizard .wizard-eyes');
var eyesField = document.querySelector('.custom-eyes');
var currentEyes = document.querySelector('.wizard-eyes');

var playerFierball = document.querySelector('.setup-fireball-wrap');
var fierballField = document.querySelector('.custom-fierball');
var currentFierball = document.querySelector('.setup-fireball');

var setFierballColor = function (arr) {
  playerFierball.style.backgroundColor = arr[getRandomInRange(0, arr.length - 1)];
  return playerFierball.style.backgroundColor;
};

currentFierball.addEventListener('click', function () {

  var fireBallColor = setFierballColor(FIERBALL_COLORS);
  if (fireBallColor === 'rgb(238, 72, 48)') {
    fireBallColor = '#ee4830';
  } else if (fireBallColor === 'rgb(48, 168, 238)') {
    fireBallColor = '#30a8ee';
  } else if (fireBallColor === 'rgb(92, 230, 192)') {
    fireBallColor = '#5ce6c0';
  } else if (fireBallColor === 'rgb(232, 72, 213)') {
    fireBallColor = '#e848d5';
  } else if (fireBallColor === 'rgb(230, 232, 72)') {
    fireBallColor = '#e6e848';
  }

  fierballField.value = fireBallColor;
});

var setEyesColor = function (arr) {
  currentEyes.style.fill = arr[getRandomInRange(0, arr.length - 1)];
  return currentEyes.style.fill;
};

playerEyes.addEventListener('click', function () {
  eyesField.value = setEyesColor(EYES_COLORS);
});

var setCoatColor = function (arr) {
  currentCoat.style.fill = arr[getRandomInRange(0, arr.length - 1)];
  return currentCoat.style.fill;
};

playerCoat.addEventListener('click', function () {
  coatField.value = setCoatColor(COAT_COLORS);
});

document.querySelector('.setup-similar').classList.remove('hidden');

var similarList = document.querySelector('.setup-similar-list');
var similarTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizardName, wizardLastName, coat, eyes) {
  var wizradsArray = [];
  for (var i = 0; i < PLAYERS; i++) {
    var customWizard = {
      name: wizardName[getRandomInRange(0, wizardName.length - 1)] + ' ' + wizardLastName[getRandomInRange(0, wizardLastName.length - 1)],
      coatColor: coat[getRandomInRange(0, coat.length - 1)],
      eyesColor: eyes[getRandomInRange(0, eyes.length - 1)]
    };
    wizradsArray.push(customWizard);
  }
  return wizradsArray;
};

var wizards = renderWizard(WIZARD_NAMES, WIZARD_LASTNAMES, COAT_COLORS, EYES_COLORS);

var renderSimilar = function (arr) {
  for (var i = 0; i < PLAYERS; i++) {
    var fragment = similarTemplate.cloneNode(true);
    fragment.querySelector('.setup-similar-label').textContent = arr[i].name;
    fragment.querySelector('.wizard-coat').style.fill = arr[i].coatColor;
    fragment.querySelector('.wizard-eyes').style.fill = arr[i].eyesColor;
    similarList.appendChild(fragment);
  }
};

renderSimilar(wizards);
