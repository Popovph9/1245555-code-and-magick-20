'use strict';

(function () {
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_GAP = 10;
  var FONT_GAP = 20;
  var BAR_GAPX = 50;
  var BAR_WIDTH = 40;
  var BAR_MAXHEIGHT = 150;
  var FONT_GAPY = 90;
  var FONT = '16px PT Mono';
  var FONT_STYLE = '#000000';
  var FONT_ALIGN = 'hanging';

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderText = function (ctx, text, x, y) {
    ctx.font = FONT;
    ctx.textBaseline = FONT_ALIGN;
    ctx.fillStyle = FONT_STYLE;
    ctx.fillText(text, x, y);
  };
  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

    renderText(ctx, 'Ура вы победили!', CLOUD_X + CLOUD_GAP, CLOUD_Y + FONT_GAP);
    renderText(ctx, 'Список результатов:', CLOUD_X + CLOUD_GAP, CLOUD_Y + FONT_GAP * 2);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {
      var barSaturation = window.rand.getRandomInRange(30, 70);
      var getColor = 'hsl(240, ' + barSaturation * i + '%, 30%)';
      if (players[i] === 'Вы') {
        getColor = 'rgba(255, 0, 0, 1)';
      }

      ctx.fillStyle = FONT_STYLE;
      ctx.fillText(Math.ceil(times[i]), CLOUD_X + BAR_GAPX * i + BAR_GAPX, FONT_GAPY + BAR_MAXHEIGHT - ((BAR_MAXHEIGHT * times[i]) / maxTime) - FONT_GAP);

      ctx.fillStyle = getColor;
      ctx.fillRect(CLOUD_X + BAR_GAPX * i + BAR_GAPX, FONT_GAPY + BAR_MAXHEIGHT - ((BAR_MAXHEIGHT * times[i]) / maxTime), BAR_WIDTH, (BAR_MAXHEIGHT * times[i]) / maxTime);

      ctx.fillStyle = FONT_STYLE;
      ctx.fillText(players[i], CLOUD_X + BAR_GAPX * i + BAR_GAPX, 250);
    }
  };
})();

