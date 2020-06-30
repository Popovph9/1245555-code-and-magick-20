'use strict';

(function () {
  var PLAYERS = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];


  document.querySelector('.setup-similar').classList.remove('hidden');

  var similarList = document.querySelector('.setup-similar-list');
  var similarTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizardName, wizardLastName, coat, eyes) {
    var wizradsArray = [];
    for (var i = 0; i < PLAYERS; i++) {
      var customWizard = {
        name: wizardName[window.rand.getRandomInRange(0, wizardName.length - 1)] + ' ' + wizardLastName[window.rand.getRandomInRange(0, wizardLastName.length - 1)],
        coatColor: coat[window.rand.getRandomInRange(0, coat.length - 1)],
        eyesColor: eyes[window.rand.getRandomInRange(0, eyes.length - 1)]
      };
      wizradsArray.push(customWizard);
    }
    return wizradsArray;
  };

  var wizards = renderWizard(WIZARD_NAMES, WIZARD_LASTNAMES, window.colorize.COAT_COLORS, window.colorize.EYES_COLORS);

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
})();
