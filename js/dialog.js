'use strict';

(function () {
  var POPUP_COORD = {
    x: 50 + '%',
    y: 80 + 'px'
  };

  var form = document.querySelector('.setup-wizard-form');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupBlock = document.querySelector('.setup');
  var setupControl = setupBlock.querySelector('.upload');

  var playerCoat = document.querySelector('.setup-wizard .wizard-coat');
  var playerEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var currentFierball = document.querySelector('.setup-fireball');

  var popupEscHandler = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    setupBlock.classList.remove('hidden');

    document.addEventListener('keydown', popupEscHandler);
    playerEyes.addEventListener('click', window.colorize.eyesChangeHandler);
    playerCoat.addEventListener('click', window.colorize.coatChangeHandler);
    currentFierball.addEventListener('click', window.colorize.fireballClickHandler);
    resetDialog();
  };

  var closePopup = function () {
    setupBlock.classList.add('hidden');

    document.removeEventListener('keydown', popupEscHandler);
    playerEyes.removeEventListener('click', window.colorize.eyesChangeHandler);
    playerCoat.removeEventListener('click', window.colorize.coatChangeHandler);
    currentFierball.removeEventListener('click', window.colorize.fireballClickHandler);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closePopup);
  });

  var formSubmitHadler = function (evt) {
    window.backend.save(new FormData(form), function () {
      setupBlock.classList.add('hidden');
    });
    evt.preventDefault();
  };

  form.addEventListener('submit', formSubmitHadler);

  setupControl.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupBlock.style.top = (setupBlock.offsetTop - shift.y) + 'px';
      setupBlock.style.left = (setupBlock.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          setupControl.removeEventListener('click', onClickPreventDefault);
        };

        setupControl.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var resetDialog = function () {
    setupBlock.style.left = POPUP_COORD.x;
    setupBlock.style.top = POPUP_COORD.y;
  };
})();

