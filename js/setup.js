'use strict';
var PLAYERS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarList = document.querySelector('.setup-similar-list');
var similarTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

var renderSimilar = function () {
  for (var i = 0; i < PLAYERS; i++) {
    var fragment = similarTemplate.cloneNode(true);
    fragment.querySelector('.setup-similar-label').textContent = wizards[i].name;
    fragment.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    fragment.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
    similarList.appendChild(fragment);
  }
};

renderSimilar();
