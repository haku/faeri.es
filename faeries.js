(function(){

  document.addEventListener("DOMContentLoaded", function(event) {
    drawFL()
  })

  var W = 1000
  var H = 1000

  var drawFL = function() {
    var seed = rndInt(100000000, 999999999)
    console.log('seed', seed)
    var rnd = sineDistFact(blumBlumShubFact(seed, 7247, 7823))

    var draw = SVG('bg0')
      .size('100%', '100%')
      .viewbox(0, 0, W, H)
      .attr('preserveAspectRatio', 'xMidYMax slice')

    draw.rect(W, H)
      .fill({ opacity: 0 })

    var x = rnd(50, 100)
    while (x < 950) {
      var h = rnd(70, 100)
      shroom(draw, rnd)
        .size(100, h)
        .cx(x).y(H - h)
      x += rnd(50, 130)
    }
  }

  var shroom = function(draw, rnd) {
    var stalkW = rnd(10, 25)
    var leftM = rnd(5, 30)
    var rightM = rnd(5, 30)
    var btmIndent = rnd(-14, 0)
    var btmCornerTweak = (btmIndent < -5 ? 2 : 0)
    var btmH = rnd(0, 45)
    var rotate = rnd(-20, 20)

    var m = draw.nested().viewbox(0, 0, 100, 100)

    m.rect(stalkW, 70)
      .cx(50).y(30 + (btmH * 0.4))
      .fill('#fff')

    var path = ('m ' + leftM + ',' + (50 + btmH) + ' ' +
           'c 20,' + btmIndent + ' ' + (80 - (leftM + rightM)) + ',' + btmIndent + ' ' + (100 - (leftM + rightM)) + ',0 ' +
           '5,' + btmCornerTweak + ' 5,-1 -1,-7 ' +
           'C 50,0 50,0 ' + (leftM + 1) + ',' + (43 + btmH) + ' ' +
           (leftM - 5) + ',' + (49 + btmH) + ' ' + (leftM - 5) + ',' + (50 + btmCornerTweak + btmH) + ' ' + leftM + ',' + (50 + btmH) + ' z')
    console.log('path', path)
    m.path(path)
      .cx(50).y(0)
      .attr('transform', 'rotate(' + rotate + ', 50, 50)')
      .fill('#fff')

    return m
  }

  // m 5,50 c 20,-10 70,-10 90,0 5,2 5,-1 -1,-7 C 50,0 50,0 6,43 0,49 0,52 5,50 z // start.

  var rndInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  var blumBlumShubFact = function(seed, mod1, mod2) {
    return function() {
      seed = (seed * seed) % (mod1 * mod2)
      return seed / (mod1 * mod2)
    }
  }

  var sineDistFact = function(rnd) {
    return function(min, max) {
      var i = rnd()
      var range = max - min
      var x = Math.floor(Math.sin(i * Math.PI) * (range / 2))
      x = i > 0.5 ? range - x : x
      return x + min
    }
  }

})()
