'use strict';

window.colorize = (function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIERBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var coatField = document.querySelector('.custom-coat');
  var currentCoat = document.querySelector('.wizard-coat');

  var eyesField = document.querySelector('.custom-eyes');
  var currentEyes = document.querySelector('.wizard-eyes');

  var playerFierball = document.querySelector('.setup-fireball-wrap');
  var fierballField = document.querySelector('.custom-fierball');

  var setFierballColor = function (arr) {
    playerFierball.style.backgroundColor = arr[window.rand.getRandomInRange(0, arr.length - 1)];
    return playerFierball.style.backgroundColor;
  };

  var setCuastomFireball = function () {
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
  };

  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';

  var PLAYERS = 4;

  document.querySelector('.setup-similar').classList.remove('hidden');

  var similarList = document.querySelector('.setup-similar-list');
  var similarTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var wizards = [];

  var renderSimilar = function (wizard) {
    var wizardElement = similarTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var renderWizards = function (data) {

    var fragment = document.createDocumentFragment();

    var takeNumber = data.length > PLAYERS ? PLAYERS : data.length;
    similarList.innerHTML = '';

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderSimilar(data[i]));
    }
    similarList.appendChild(fragment);
  };

  var loadDataHandler = function (data) {
    wizards = data;

    renderWizards(wizards);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(loadDataHandler, errorHandler);

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    renderWizards(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }

      return rankDiff;
    }));
  };

  var setEyesColor = function (arr) {
    var newColor = arr[window.rand.getRandomInRange(0, arr.length - 1)];
    currentEyes.style.fill = newColor;
    eyesColor = newColor;
    return currentEyes.style.fill;
  };

  var setCustomEye = function () {
    eyesField.value = setEyesColor(EYES_COLORS);
  };

  var setCoatColor = function (arr) {
    var newColor = arr[window.rand.getRandomInRange(0, arr.length - 1)];
    currentCoat.style.fill = newColor;
    coatColor = newColor;
    return currentCoat.style.fill;
  };

  var setCustomCoat = function () {
    coatField.value = setCoatColor(COAT_COLORS);
  };

  var fireballClickHandler = function () {
    setCuastomFireball();
  };

  var eyesChangeHandler = function () {
    setCustomEye();
    window.debounce(updateWizards);
  };

  var coatChangeHandler = function () {
    setCustomCoat();
    window.debounce(updateWizards);
  };

  return {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIERBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],

    fireballClickHandler: fireballClickHandler,

    eyesChangeHandler: eyesChangeHandler,

    coatChangeHandler: coatChangeHandler
  };
})();
