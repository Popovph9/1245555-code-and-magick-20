'use strict';

window.rand = (function () {
  return {
    getRandomInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    shuffle: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = array[i]; array[i] = array[j]; array[j] = t
        ;
      }
    }
  };
})();
