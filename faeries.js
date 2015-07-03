(function(){

  document.addEventListener("DOMContentLoaded", function(event) {
    drawFL()
  })

  var W = 1000
  var H = 1000

  var drawFL = function() {
    var draw = SVG('bg0')
      .size('100%', '100%')
      .viewbox(0, 0, W, H)
      .attr('preserveAspectRatio', 'xMidYMax slice')
    draw.rect(W, H)
      .fill({ opacity: 0 })
      .stroke('#f0f')
    shroom(draw)
      .size(200, 200)
      .cx(500).y(H - 200)
  }

  var shroom = function(draw) {
    var stalkW = 30 // 10 to 40.
    var leftM =  5 // 5 to 30.
    var rightM = 5 // 5 to 30.
    var btmIndent = -10 // 0 to -14.
    var btmCornerTweak = (btmIndent < -5 ? 2 : 0)
    var btmH = 0 // 0 to 45.
    var rotate = 0 // -25 to 25.

    var m = draw.nested().viewbox(0,0,100,100)

    m.rect(stalkW, 70)
      .cx(50).y(30 + btmH)
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

})()
