'use strict';

window.util = (function () {
  var ESCAPE_NUM = 'Escape';
  var ENTER_NUM = 'Enter';

  return {
    isEscEvent: function (evt, action) {
      if (evt.key === ESCAPE_NUM) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_NUM) {
        action();
      }
    }
  };
})();
