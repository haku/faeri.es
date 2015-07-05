(function(){

  document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('bg0').onclick = drawFL
    drawFL()
  })

  var W = 1000
  var H = 1000

  var drawFL = function() {
    var seed = rndInt(100000000, 999999999)
    console.log('seed', seed)
    var rnd = sineDistFact(blumBlumShubFact(seed, 7247, 7823))

    removeElementById('bg0_svg')
    var draw = SVG('bg0')
      .attr('id', 'bg0_svg')
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
    var stalkTopN = Math.min(rnd(5, 15), stalkW / 2) // narrowing
    var stalkS = rnd(-10, 10) // shift / lean
    var leftM = rnd(5, 30)
    var rightM = rnd(5, 30)
    var btmIndent = rnd(-14, 5)
    var btmCornerTweak = (btmIndent < -5 ? 2 : 0)
    var btmH = rnd(0, 45)
    var rotate = rnd(-20, 20)

    var m = draw.nested().viewbox(0, 0, 100, 100)

    var sPath = ('m 0,0 ' +
        'c ' + stalkTopN + ',0 ' + (-stalkS + stalkTopN) + ',17 ' + (-stalkS + stalkTopN) + ',50 ' +
        '0,17 ' + stalkS + ',20 ' + stalkS + ',20 ' +
        'l ' + -stalkW + ',0 ' +
        'c 0,0 ' + -stalkS + ',-2 ' + -stalkS + ',-20 ' +
        '0,-17 ' + stalkS + ',-50 ' + (stalkS + stalkTopN) + ',-50 z')
    console.log('sPath', sPath)
    var stalkH = 85 - btmH
    m.path(sPath)
      .cx(50).y(100 - stalkH)
      .height(stalkH)
      .fill('#fff')

    var cPath = ('m ' + leftM + ',' + (50 + btmH) + ' ' +
           'c 20,' + btmIndent + ' ' + (80 - (leftM + rightM)) + ',' + btmIndent + ' ' + (100 - (leftM + rightM)) + ',0 ' +
           '5,' + btmCornerTweak + ' 5,-1 -1,-7 ' +
           'C 50,0 50,0 ' + (leftM + 1) + ',' + (43 + btmH) + ' ' +
           (leftM - 5) + ',' + (49 + btmH) + ' ' + (leftM - 5) + ',' + (50 + btmCornerTweak + btmH) + ' ' + leftM + ',' + (50 + btmH) + ' z')
    console.log('cPath', cPath)
    m.path(cPath)
      .cx(50).y(0)
      .attr('transform', 'rotate(' + rotate + ', 50, 50)')
      .fill('#fff')

    return m
  }

  // m 5,50 c 20,-10 70,-10 90,0 5,2 5,-1 -1,-7 C 50,0 50,0 6,43 0,49 0,52 5,50 z
  // m 65,30 c 0,0 0,17 0,35 0,17 0,35 0,35 l -30,0 c 0,0 0,-17 0,-35 0,-17 0,-35 0,-35 z

  var removeElementById = function(id) {
    var el = document.getElementById(id)
    if (el) el.parentElement.removeChild(el)
  }

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
