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

  var setEyesColor = function (arr) {
    currentEyes.style.fill = arr[window.rand.getRandomInRange(0, arr.length - 1)];
    return currentEyes.style.fill;
  };

  var setCustomEye = function () {
    eyesField.value = setEyesColor(EYES_COLORS);
  };

  var setCoatColor = function (arr) {
    currentCoat.style.fill = arr[window.rand.getRandomInRange(0, arr.length - 1)];
    return currentCoat.style.fill;
  };

  var setCustomCoat = function () {
    coatField.value = setCoatColor(COAT_COLORS);
  };

  return {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIERBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],

    fireballClickHandler: function () {
      setCuastomFireball();
    },

    eyesClickHandler: function () {
      setCustomEye();
    },

    coatClickHandler: function () {
      setCustomCoat();
    }
  };
})();
