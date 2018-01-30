var allTds = [];
$('allTds').each(function() {
  allTds.push('#' + $(this).attr('id'));
});

var winArr = [['T1', 'T2', 'T3'],
              ['M1', 'M2', 'M3'],
              ['B1', 'B2', 'B3'],
              ['T1', 'M2', 'B3'],
              ['T1', 'M1', 'B1'],
              ['T2', 'M2', 'B2'],
              ['T3', 'M3', 'B3'],
              ['B1', 'M2', 'T3']];

var tttData = {
  openSpots    : 9,
  xType        : 'human',
  oType        : 'machine',
  playerTurn   : 'x',
  playerXSpots : [],
  playerOSpots : [],
  click        : false,
  score        : {
    humanX   : 0,
    humanO   : 0,
    machineX : 0,
    machineO : 0
  }
};

var simonData = {
  machineStreak : [],
  playerStreak  : [],
  playerFail    : false,
  clickCount    : 0,
  maxTurns      : 10,
  click         : false
};

$(document).ready(function() {
  $('.btn-wrapper__left-bt--click').on('click', function() {
    $('.btn-wrapper__right-bt').addClass('header__button').removeClass('btn-wrapper__right-bt--click').css({top : '2vh', width: '40px', height: '40px'});
    $('.btn-wrapper__left-bt--click').fadeOut(200);
    displayTTT(tttData, simonData);
    setGameBtnClick();
    $(this).data('game', 's');
  });

  $('.btn-wrapper__right-bt--click').on('click', function() {
    $('.btn-wrapper__left-bt').addClass('header__button').removeClass('btn-wrapper__left-bt--click').css({top : '2vh', width: '40px', height: '40px'});
    $('.btn-wrapper__right-bt--click').fadeOut(200);
    displaySimon(tttData, simonData);
    setGameBtnClick();
    $(this).data('game', 't');
  });

  $('.main__simon-bt-play').click(function() {
    $('#simon-play-svg').css('display', 'none');
    $(this).css("pointer-events", "none");
    simonManager(simonData);
  });
});

function displaySimon(tttData, simonData) {
  tttData.xType = 'human';
  tttData.oType = 'machine';
  $('.td').css('pointer-events', 'none');
  clearTimeout(tttActiveClick);
  setTimeout(function () {
    tttData.openSpots    = 9;
    tttData.playerTurn   = 'x';
    tttData.playerXSpots = [];
    tttData.playerOSpots = [];
    tttData.click        = false;
    $('.main__ttt-bt-x-img').attr('src', 'https://res.cloudinary.com/dt4qeehms/image/upload/v1490187603/ttt-simon/human.jpg');
    $('.main__ttt-bt-o-img').attr('src', 'https://res.cloudinary.com/dt4qeehms/image/upload/v1490187603/ttt-simon/pc.png');
    $('.tr').find('.x').remove();
    $('.tr').find('.o').remove();
  }, 700);
  $('.header__button').data('game', 's');
  $('.main').css('display', 'flex');
  $('.ttt').fadeOut(500);
  $('.simon').fadeIn(500);
  $('.main-wrapper').fadeIn(1200);
  $('.ttt-l').css('border-left', 'none');
  $('.ttt-b').css('border-bottom', 'none');
  $('.simon-l').css('border-left', 'solid black 5px');
  $('.simon-b').css('border-bottom', 'solid black 5px');
  $('.main__table').css('width', '300px').css('height', '300px');
  $(greenQuadrantIDs).css('background-color', '#45D655');
  $(redQuadrantIDs).css('background-color', '#DC3B22');
  $(yellowQuadrantIDs).css('background-color', '#E1D934');
  $(blueQuadrantIDs).css('background-color', '#00A8F1');
  $('.td').off();
  simonOnClick(simonData);
}

function displayTTT(tttData, simonData) {
  simonData.machineStreak = [];
  simonData.playerStreak  = [];
  simonData.playerFail    = false;
  simonData.clickCount    = 0;
  simonData.click         = false;
  $(".td").css("pointer-events", "auto");
  clearTimeout(afterClickAlertAFK);
  clearTimeout(alertAFK);
  $('.main__simon-bt-play').text('');
  $('.main__simon-bt-play').append(playIcon);
  $('.main__simon-bt-play').css("pointer-events", "auto");
  $('.header__button').data('game', 't');
  $('.main').css('display', 'flex');
  $('.simon-l').css('border-left', 'none');
  $('.simon-b').css('border-bottom', 'none');
  $('.ttt-l').css('border-left', 'solid white 2px');
  $('.ttt-b').css('border-bottom', 'solid white 2px');
  $('.main__table').css('width', '220px').css('height', '220px');
  $('.td').css('background-color', 'transparent');
  $('.td').off();
  $('.simon').fadeOut(500);
  $('.ttt').fadeIn(500);
  $('.main-wrapper').fadeIn(1500);
  tttOnClick(tttData);
}

function setGameBtnClick() {
  $('.header__button').off();
  $('.header__button').on('click', function () {
    if ($(this).data('game') === 't') {
      $(this).css('background-image','url(https://res.cloudinary.com/dt4qeehms/image/upload/v1490187603/ttt-simon/tttbt.svg)');
      transitionEffect('ttt-simon');
      setTimeout(function() {
        displaySimon(tttData, simonData);
      }, allTds.length * 40);
    } else {
        $(this).css('background-image','url(https://res.cloudinary.com/dt4qeehms/image/upload/v1490187603/ttt-simon/simonbt.svg)');
        transitionEffect('simon-ttt');
        setTimeout(function() {
          displayTTT(tttData, simonData);
        }, allTds.length * 40);
      }
  });
}

function transitionEffect(transitionType) {
  $('body').css("pointer-events", "none");
  $('.td').css("pointer-events", "none");
  //Shuffle Array
  allTdsRdn = allTds.sort(function() {
    return 0.5 - Math.random();
  });

  if (transitionType === 'simon-ttt') {
      for (var i = 0; i < allTdsRdn.length; i++) {
        setTimeout(function(j) {
          $(allTdsRdn[j]).css("visibility", "hidden");
        }, i * 20, i);
      }
      setTimeout(function() {
        $('.td').css('background-color', 'transparent');
        $(allTds.join(', ')).css('border', 'white 2px solid').css("visibility", "visible");
      }, allTds.length * 20);
      setTimeout(function() {
        $('body').css("pointer-events", "auto");
        for (var i = 0; i < allTdsRdn.length; i++) {
          setTimeout(function(j) {
            $(allTdsRdn[j]).css('border', '');
          }, i * 20, i);
        }
      }, allTds.length * 40 + 200);
  } else {
      if (transitionType === 'ttt-simon') {
        clearTimeout(xTurn);
        clearTimeout(oTurn);
        $('.tr').find('.x').remove();
        $('.tr').find('.o').remove();
        for (var i = 0; i < allTdsRdn.length; i++) {
          setTimeout(function(j) {
            $(allTdsRdn[j]).css('border', 'white 2px solid');
          }, i * 20, i);
        }
        setTimeout(function() {
          $(greenQuadrantIDs).css('background-color', '#45D655');
          $(redQuadrantIDs).css('background-color', '#DC3B22');
          $(yellowQuadrantIDs).css('background-color', '#E1D934');
          $(blueQuadrantIDs).css('background-color', '#00A8F1');
        }, allTds.length * 20 - 200);
        setTimeout(function() {
          $('body').css("pointer-events", "auto");
          $(allTds.join(', ')).css('border', '');
          $('.ttt-l').css('border-left', 'none');
          $('.ttt-b').css('border-bottom', 'none');
        }, allTds.length * 20);
      }
    }


    //$('.main').fadeOut(1200);
}

var greenQuadrantIDs  = '#td-11, #td-12, #td-13, #td-21, #td-22, #td-23, #td-31, #td-32, #td-33';
var redQuadrantIDs    = '#td-14, #td-15, #td-16, #td-24, #td-25, #td-26, #td-34, #td-35, #td-36';
var yellowQuadrantIDs = '#td-41, #td-42, #td-43, #td-51, #td-52, #td-53, #td-61, #td-62, #td-63';
var blueQuadrantIDs   = '#td-44, #td-45, #td-46, #td-54, #td-55, #td-56, #td-64, #td-65, #td-66';
var playIcon = '<svg id="simon-play-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 394.28572 455.28192" width="65%" height="65%"><path d="M354.286 227.641L20 420.641v-386z" fill="none" stroke="#45d655" stroke-width="40"/></svg>';
var playerTime  = 230;
var machineTime = 270;
var alertAFK;
var afterClickAlertAFK;
var green  = new Quadrant(greenQuadrantIDs,'green','#7BFF91','#45D655');
var red    = new Quadrant(redQuadrantIDs,'red','#F68163','#DC3B22');
var yellow = new Quadrant(yellowQuadrantIDs,'yellow','#FFFDA9','#E1D934');
var blue   = new Quadrant(blueQuadrantIDs,'blue','#4FEEFF','#00A8F1');

$('.main__simon-bt-mode').click(function () {
  resetSimonData(simonData);
  $(".td").css("pointer-events", "none");
  $('.main__simon-bt-mode').data('mode') === 's' ? $('.main__simon-bt-mode').data('mode' , 'n').text('N').css('color', '#00A8F1') : $('.main__simon-bt-mode').data('mode' , 's').text('S').css('color', '#DC3B22');
  $('.main__simon-bt-play').text('');
  $('.main__simon-bt-play').append(playIcon);
  $('.main__simon-bt-play').css("pointer-events", "auto");
  clearTimeout(alertAFK);
  clearTimeout(afterClickAlertAFK);
});

function simonOnClick(simonData) {
  if (simonData.click === false) {
    simonData.click = true;
    $(greenQuadrantIDs).on('click', function() {
      $(".td").css("pointer-events", "none");
      green.activate(playerTime);
      simonData.clickCount++;
      clearTimeout(alertAFK);
      clearTimeout(afterClickAlertAFK);
      afterClickAlertAFK = setTimeout(function(){ playerMistake(simonData); }, 5000);
      checkGameStatus(simonData, green);
    });
    $(redQuadrantIDs).on('click', function() {
      $(".td").css("pointer-events", "none");
      red.activate(playerTime);
      simonData.clickCount++;
      clearTimeout(alertAFK);
      clearTimeout(afterClickAlertAFK);
      afterClickAlertAFK = setTimeout(function(){ playerMistake(simonData); }, 5000);
      checkGameStatus(simonData, red);
    });
    $(yellowQuadrantIDs).on('click', function() {
      $(".td").css("pointer-events", "none");
      yellow.activate(playerTime);
      simonData.clickCount++;
      clearTimeout(alertAFK);
      clearTimeout(afterClickAlertAFK);
      afterClickAlertAFK = setTimeout(function(){ playerMistake(simonData); }, 5000);
      checkGameStatus(simonData, yellow);
    });
    $(blueQuadrantIDs).on('click', function() {
      $(".td").css("pointer-events", "none");
      blue.activate(playerTime);
      simonData.clickCount++;
      clearTimeout(alertAFK);
      clearTimeout(afterClickAlertAFK);
      afterClickAlertAFK = setTimeout(function(){ playerMistake(simonData); }, 5000);
      checkGameStatus(simonData, blue);
    });
  }
}

function simonManager(s) {
  $(".td").css("pointer-events", "none");
  $('#simon-play-svg').css('display', 'none');
  resetSimonData(s);
  setScore(s);
  machineTurn(s);
}

function setScore(s) {
  currentRound = s.machineStreak.length + 1;
  function n(n) {
    return n > 9 ? "" + n: "0" + n;
  }
  $('.main__simon-bt-play').text(n(currentRound));
}

function playerTurn(s) {
  s.playerStreak  = [];
  s.playerFail = false;
  setTimeout(function() {
    alertAFK = setTimeout(function(){ playerMistake(s); }, 5000);
    if ($('.main__simon-bt-play').text()) {
      $(".td").css("pointer-events", "auto");
    }
  }, machineTime * 2 * s.machineStreak.length);
}

function checkGameStatus(s, quadrant) {
  if (s.machineStreak[s.clickCount - 1].colorName === quadrant.colorName) {
    playerScore(s, quadrant);
  } else {
      playerMistake(s);
    }
}

function playerScore(s, quadrant) {
  if(s.clickCount === s.maxTurns) {
    winEvent();
    $('.main__simon-bt-play').css("pointer-events", "auto");
    clearTimeout(afterClickAlertAFK);
    clearTimeout(alertAFK);
    return;
  } else {
    $(".td").css("pointer-events", "auto");
    }

  s.playerStreak.push(quadrant);
  if (s.machineStreak.length === s.clickCount) {
    setTimeout(function () {
      machineTurn(s);
    }, playerTime / 2);
  }
}

function winEvent() {
  document.getElementById('win').play();
  $('.main__simon-bt-play').text('');
  $('.main__simon-bt-play').append(playIcon);
  $('body').css('backgroundImage', "url(https://res.cloudinary.com/dt4qeehms/image/upload/v1488934896/427118_1_n0wxq7.jpg)");
  $('.game-container').fadeOut("slow", function () {
      $('.game-container').css({display:"none"});
  });
  setTimeout(function () {
    $('.game-container').fadeIn("slow", function () {
      $('.game-container').css({display:"block"});
    });
    $('body').css('backgroundImage', "none");
  }, machineTime * 7);
}

function playerMistake(s) {
  $(".td").css("pointer-events", "none");
  s.playerFail = true;
  setTimeout(function () {
    mistakeEvent();
    if ($('.main__simon-bt-mode').data('mode') === 'n') {
      setTimeout(function () {
      machineTurn(s);
      }, machineTime * 2);
    } else {
      setTimeout(function () {
        $('.main__simon-bt-play').text('');
        $('.main__simon-bt-play').append(playIcon);
        $('.main__simon-bt-play').css("pointer-events", "auto");
        clearTimeout(afterClickAlertAFK);
        clearTimeout(alertAFK);
      }, machineTime * 2);
      return;
    }
  }, playerTime * 1.5);
}

function mistakeEvent() {
  document.getElementById('lose').play();
  green.activate(playerTime * 1.4, false);
  red.activate(playerTime * 1.4, false);
  yellow.activate(playerTime * 1.4, false);
  blue.activate(playerTime * 1.4, false);
}

function machineTurn(s) {
  $(".td").css("pointer-events", "none");
  clearTimeout(afterClickAlertAFK);
  clearTimeout(alertAFK);
  setTimeout(function() {
    s.clickCount = 0;
    if(!s.playerFail) {
      setScore(s);
      pushNewColor(s.machineStreak);
    }
    activateAllColorsStreak(s.machineStreak);
    playerTurn(s);
  }, machineTime * 2);
}

function pushNewColor(streak) {
  var colors = [green, red, yellow, blue];
  streak.push(colors[Math.floor(Math.random()*colors.length)]);
}

function Quadrant(IDs, colorName, hexLight, hexDark) {
  var that = this;
  this.IDs              = IDs;
  this.colorName        = colorName;
  this.hexLight         = hexLight;
  this.hexDark          = hexDark;
  this.activate = function(time, playAudio) {
    playAudio = (typeof playAudio !== 'undefined') ?  playAudio : true;
    if (playAudio) {
      var audio = document.getElementById(this.colorName);
      audio.currentTime = 0;
      audio.play();
    }
    $(this.IDs).css('background-color', this.hexLight);
    setTimeout(function() {
      $(that.IDs).css('background-color', that.hexDark);
    }, time);
  };
}

function activateAllColorsStreak(streak) {
  for (var i = 0; i < streak.length; i++) {
    setTimeout(function(j) {
      streak[j].activate(machineTime, true);
    }, i * machineTime * 2, i);
  }
}

function resetSimonData(s) {
  s.machineStreak = [];
  s.playerStreak = [];
  s.clickCount = 0;
  s.playerFail = false;
}

var xTurn;
var oTurn;
var tttActiveClick;

$('.main__ttt-bt-x').click(function() {
  $('.td').css('pointer-events', 'none');
  clearTimeout(xTurn);
  clearTimeout(oTurn);
  if (tttData.xType === 'human') {
    tttData.xType = 'machine';
    $('.main__ttt-bt-x-img').attr('src', 'https://res.cloudinary.com/dt4qeehms/image/upload/v1490187603/ttt-simon/pc.png');
    updateScore(tttData);
  } else {
    tttData.xType = 'human';
    $('.main__ttt-bt-x-img').attr('src', 'https://res.cloudinary.com/dt4qeehms/image/upload/v1490187603/ttt-simon/human.jpg');
    updateScore(tttData);
  }
  $('.ttt-bt').css('pointer-events', 'none');
  setTimeout(function() {
    tttReset(tttData);
    $('.ttt-bt').css('pointer-events', 'auto');
  }, 1200);
});

$('.main__ttt-bt-o').click(function() {
  $('.td').css('pointer-events', 'none');
  clearTimeout(xTurn);
  clearTimeout(oTurn);
  if (tttData.oType === 'human') {
    tttData.oType = 'machine';
    $('.main__ttt-bt-o-img').attr('src', 'https://res.cloudinary.com/dt4qeehms/image/upload/v1490187603/ttt-simon/pc.png');
    updateScore(tttData);
  } else {
    tttData.oType = 'human';
    $('.main__ttt-bt-o-img').attr('src', 'https://res.cloudinary.com/dt4qeehms/image/upload/v1490187603/ttt-simon/human.jpg');
    updateScore(tttData);
  }
  $('.ttt-bt').css('pointer-events', 'none');
  setTimeout(function() {
    $('.ttt-bt').css('pointer-events', 'auto');
    tttReset(tttData);
  }, 1200);
});

function tttOnClick(tttData) {
  if (tttData.click === false) {
    tttData.click = true;
    $('.td').on('click', function() {
        tttManager(tttData, this.id);
    });
  }
}

function tttManager(t, clickedSpot) {
  $('.td').css('pointer-events', 'auto');
  var xsvg_1 = '<svg class= "ttt-svg x-svg" version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMaxYMax" viewBox="0 0 3400 3400"><g class="svg-curve" id="';
  var xsvg_2 = '" fill="#FFFFFF" stroke="none"><path d="M220 2335 l-225 -225 413 -413 412 -412 -410 -410 c-225 -225 -410 -414 -410 -420 0 -13 448 -461 454 -455 3 3 186 186 408 407 222 222 411 403 418 403 8 0 198 -183 422 -407 l408 -408 225 225 c124 124 225 229 225 235 0 6 -185 195 -410 420 l-410 410 412 412 413 413 -225 225 c-124 124 -229 225 -235 225 -5 0 -193 -183 -417 -407 l-407 -407 -409 407 c-225 224 -413 407 -418 407 -5 0 -110 -101 -234 -225z"/></g></svg>';
  var osvg_1 = '<svg class= "ttt-svg o-svg" version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMaxYMax" viewBox="0 0 3400 3400"><g class="svg-curve" id="';
  var osvg_2 = '" fill="#FFFFFF" stroke="none"><path d="M1090 2545 c-52 -7 -140 -28 -195 -45 -434 -139 -758 -493 -861 -940 -25 -107 -30 -378 -10 -500 45 -263 157 -482 349 -678 174 -177 359 -285 584 -341 373 -93 758 -24 1069 191 91 62 265 241 326 333 146 224 208 437 208 716 0 278 -64 493 -214 718 -75 113 -239 278 -342 344 -282 182 -581 248 -914 202z m404 -331 c289 -73 524 -261 651 -519 75 -153 90 -223 90 -415 0 -142 -3 -176 -23 -245 -96 -332 -364 -596 -691 -682 -133 -35 -325 -37 -456 -4 -297 72 -558 302 -674 593 -83 209 -80 471 7 696 96 249 347 477 612 555 119 36 110 35 274 36 104 1 166 -4 210 -15z"/></g></svg>';
  var spotGroup = convertClickedSpot(clickedSpot);

  if (t.score.humanX === 99 || t.score.machineX === 99 || t.score.humanO === 99 || t.score.machineO === 99) {
    t.score.humanX   = 0;
    t.score.humanO   = 0;
    t.score.machineX = 0;
    t.score.machineO = 0;
  }

  if (t.playerXSpots.indexOf(spotGroup.g) > -1 || t.playerOSpots.indexOf(spotGroup.g) > -1) {
    return;
  } else if (t.playerTurn === 'x') {
    t.playerXSpots.push(spotGroup.g);
    $('#' + spotGroup.tdRef).prepend("<div class='x'>" + xsvg_1 + spotGroup.g + xsvg_2 + "</div>");

    if (t.openSpots < 6) {
      if (checkForWin(t.playerTurn, t.playerXSpots, spotGroup.tdRef)) {
        setTimeout(function() {
          console.log('#score-' + t.playerTurn);
          $('#score-x').removeClass("make-green");
          $('.svg-curve').removeClass('make-green');
        }, 1000);
        t.xType === 'human' ? t.score.humanX++ : t.score.machineX++;
        updateScore(t);
        tttReset(t);
        return;
      }
    }
  } else {
    t.playerOSpots.push(spotGroup.g);
    $('#' + spotGroup.tdRef).prepend("<div class='x'>" + osvg_1 + spotGroup.g + osvg_2 + "</div>");

    if (t.openSpots < 6) {
      if (checkForWin(t.playerTurn, t.playerOSpots, spotGroup.tdRef)) {
        setTimeout(function() {
          $('#score-o').removeClass("make-green");
          $('.svg-curve').removeClass('make-green');
        }, 1000);
        t.oType === 'human' ? t.score.humanO++ : t.score.machineO++;
        updateScore(t);
        tttReset(t);
        return;
      }
    }
  }

  if (--t.openSpots === 0) {
    $('#' + spotGroup.tdRef).hide();
    $('#' + spotGroup.tdRef).show();
    $('.svg-curve').addClass('make-red');
    setTimeout(function() {
      console.log('#score-' + t.playerTurn);
      $('.svg-curve').removeClass('make-red');
    }, 1000);
    tttReset(t);
    return;
  }

  t.playerTurn === 'x' ? t.playerTurn = 'o' : t.playerTurn = 'x';
  checkForMachine(t);
  return;
}

function convertClickedSpot(p) {
  switch (p) {
    case 'td-11':
    case 'td-12':
    case 'td-21':
    case 'td-22':
      return {tdRef:'td-11',g:'T1'};
    case 'td-13':
    case 'td-14':
    case 'td-23':
    case 'td-24':
      return {tdRef:'td-13',g:'T2'};
    case 'td-15':
    case 'td-16':
    case 'td-25':
    case 'td-26':
      return {tdRef:'td-15',g:'T3'};
    case 'td-31':
    case 'td-32':
    case 'td-41':
    case 'td-42':
      return {tdRef:'td-31',g:'M1'};
    case 'td-33':
    case 'td-34':
    case 'td-43':
    case 'td-44':
      return {tdRef:'td-33',g:'M2'};
    case 'td-35':
    case 'td-36':
    case 'td-45':
    case 'td-46':
      return {tdRef:'td-35',g:'M3'};
    case 'td-51':
    case 'td-52':
    case 'td-61':
    case 'td-62':
      return {tdRef:'td-51',g:'B1'};
    case 'td-53':
    case 'td-54':
    case 'td-63':
    case 'td-64':
      return {tdRef:'td-53',g:'B2'};
    case 'td-55':
    case 'td-56':
    case 'td-65':
    case 'td-66':
      return {tdRef:'td-55',g:'B3'};
  }
}

function checkForWin(turn, playerArr, id) {
  var win = false;
  for (var i = 0; i < winArr.length; i++) {
    win = playerArr.filter(function (elem) {
      return winArr[i].indexOf(elem) > -1;
    }).length === winArr[i].length;
    if(win) {
      $('#' + id).hide();
      $('#' + id).show();
      $('#score-' + turn).addClass("make-green");
      $('#' + winArr[i][0]).addClass("make-green");
      $('#' + winArr[i][1]).addClass("make-green");
      $('#' + winArr[i][2]).addClass("make-green");
      break;
    }
  }
  return win;
}

function updateScore(t) {
  $('.main__x-score').text(function () {
    var value;
    t.xType === 'human' ? value= n(t.score.humanX) : value = n(t.score.machineX);
    return value;
  });
  $('.main__o-score').text(function () {
    var value;
    t.oType === 'human' ? value= n(t.score.humanO) : value = n(t.score.machineO);
    return value;
  });

  function n(n) {
    return n > 9 ? "" + n: "0" + n;
  }
}

function tttReset(t) {
  clearTimeout(xTurn);
  clearTimeout(oTurn);
  $('.td').css('pointer-events', 'none');
  t.openSpots    = 9;
  t.playerTurn   = 'x';
  t.playerXSpots = [];
  t.playerOSpots = [];
  setTimeout(function() {
    $('.tr').find('.x').remove();
    $('.tr').find('.o').remove();
    checkForMachine(tttData);
  }, 1000);
  tttActiveClick = setTimeout(function() {
    if (t.xType === 'human') {
      $('.td').css('pointer-events', 'auto');
    }
  }, 1000);
}

function checkForMachine (t) {
  if (t.playerTurn === 'x' && t.xType === 'machine') {
    $('.td').css('pointer-events', 'none');
    xTurn = setTimeout(function() {
      tttManager(t, convertToTd(pickSpot(t, t.playerOSpots, t.playerXSpots)));
    }, 350);
  }
  if (t.playerTurn === 'o' && t.oType === 'machine') {
    $('.td').css('pointer-events', 'none');
    oTurn = setTimeout(function() {
      tttManager(t, convertToTd(pickSpot(t, t.playerXSpots, t.playerOSpots)));
    }, 350);
  }
}

function pickSpot(t, takenSpots, mySpots) {
  var edges        = ['T2', 'M3', 'B2', 'M1'];
  var corners      = ['T1', 'T3', 'B1', 'B3'];
  var upCorners    = ['T1', 'T3'];
  var downCorners  = ['B1', 'B3'];
  var leftCorners  = ['T1', 'B1'];
  var rightCorners = ['T3', 'B3'];
  var center       = ['M2'];
  var allGroups    = edges.concat(corners.concat(center));

  if (t.openSpots === 9) {
    return corners.concat(center)[Math.floor(Math.random()*corners.concat(center).length)];
  }

  if (t.openSpots === 8) {
    switch (takenSpots[0]) {
      case 'M2':
        return corners[Math.floor(Math.random()*corners.length)];
      case 'T1':
      case 'T3':
      case 'B1':
      case 'B3':
        return 'M2';
      case 'T2':
        return upCorners[Math.round(Math.random())];
      case 'B2':
        return downCorners[Math.round(Math.random())];
      case 'M3':
        return rightCorners[Math.round(Math.random())];
      case 'M1':
        return leftCorners[Math.round(Math.random())];
    }
  }

  if (t.openSpots === 7) {
    switch (takenSpots[0]) {
      case 'M2':
        switch (mySpots[0]) {
          case 'T1':
            return 'B3';
          case 'T3':
            return 'B1';
          case 'B1':
            return 'T3';
          case 'B3':
            return 'T1';
          case 'T2':
            return upCorners[Math.round(Math.random())];
          case 'B2':
            return downCorners[Math.round(Math.random())];
          case 'M3':
            return rightCorners[Math.round(Math.random())];
          case 'M1':
            return leftCorners[Math.round(Math.random())];
        }
        break;
      case 'T1':
      case 'T3':
      case 'B1':
      case 'B3':
        if (mySpots[0] === 'M2') {
          return pickRandom(t, allGroups);
        } else {
            return pickRandom(t, corners);
          }
        break;
      case 'T2':
      case 'B2':
      case 'M3':
      case 'M1':
        if (mySpots[0] === 'M2') {
          switch (takenSpots[0]) {
            case 'T2':
              return upCorners[Math.round(Math.random())];
            case 'B2':
              return downCorners[Math.round(Math.random())];
            case 'M3':
              return rightCorners[Math.round(Math.random())];
            case 'M1':
              return leftCorners[Math.round(Math.random())];
          }
          break;
        } else {
            return 'M2';
          }
        break;
    }
  }

  if (t.openSpots === 6) {
    var defend = twoInRow(takenSpots, mySpots).defense;
    if (defend !== null) {
      return defend;
    }

    switch (mySpots[0]) {
      case 'M2':
        if (corners.indexOf(takenSpots[1]) > -1) {
          return pickRandom(t, edges);
        } else {
          return pickRandom(t, allGroups);
        }
        break;
      case 'T1':
      case 'T3':
      case 'B1':
      case 'B3':
        if (takenSpots.indexOf('M2') > -1) {
          return pickRandom(t, corners);
        } else {
          return  'M2';
        }
        break;
      default:
        return pickRandom(t, allGroups);
    }
  }

  if (t.openSpots < 6) {
    fillRow = twoInRow(takenSpots, mySpots);
    addToRow = oneInRow(takenSpots, mySpots);
    if (fillRow.attack !== null) {
      return fillRow.attack;
    } else if (fillRow.defense !== null) {
      return fillRow.defense;
    } else if(addToRow) {
      return addToRow;
    } else {
      return pickRandom(t, allGroups);
    }
  }

}

function pickRandom(t, group) {
  currentOpenSpots = group.filter(function(elemen) {
    return t.playerXSpots.concat(t.playerOSpots).indexOf(elemen) === -1;
  });
  return currentOpenSpots[Math.floor(Math.random()*currentOpenSpots.length)];
}

function convertToTd(group) {
  switch (group) {
    case 'T1':
      return 'td-11';
    case 'T2':
      return 'td-13';
    case 'T3':
      return 'td-15';
    case 'M1':
      return 'td-31';
    case 'M2':
      return 'td-33';
    case 'M3':
      return 'td-35';
    case 'B1':
      return 'td-51';
    case 'B2':
      return 'td-53';
    case 'B3':
      return 'td-55';
  }
}

function twoInRow(takenSpots, mySpots) {
  var fillRow = {
    defense : null,
    attack   : null
  };

    for (var i = 0; i < winArr.length; i++) {
    verifyOponentRow = winArr[i].filter(function (elem) {
      return takenSpots.indexOf(elem) === -1;
    });
    if (verifyOponentRow.length === 1 && mySpots.indexOf(verifyOponentRow[0]) === -1) {
      fillRow.defense = verifyOponentRow[0];
      break;
    }
  }
    for (i = 0; i < winArr.length; i++) {
    verifyMyRow = winArr[i].filter(function (elem) {
      return mySpots.indexOf(elem) === -1;
    });
    if (verifyMyRow.length === 1 && takenSpots.indexOf(verifyMyRow[0]) === -1) {
      fillRow.attack = verifyMyRow[0];
      break;
    }
  }

  return fillRow;
}

function  oneInRow(takenSpots, mySpots) {

  var openSpots = [];
  for (var i = 0; i < winArr.length; i++) {

    verifyOponentRow = winArr[i].filter(function (elem) {
      return takenSpots.indexOf(elem) === -1;
    });
    verifyMyRow = verifyOponentRow.filter(function (elem) {
      return mySpots.indexOf(elem) > -1;
    });
    if (verifyOponentRow.length === 2 && verifyMyRow.length === 0) {
      openSpots = verifyOponentRow;
      break;
    }
  }

  return openSpots[Math.floor(Math.random()*openSpots.length)];
}
