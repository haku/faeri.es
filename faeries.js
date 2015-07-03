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
    var m = draw.nested().viewbox(0,0,100,100)
    m.rect(30, 80)
      .cx(50).y(20)
      .fill('#fff')
    var btmIndent = -10 // 0 to -14.
    var btmCornerTweak = (btmIndent < -5 ? 2 : 0)
    m.path('m 5,50 ' +
           'c 20,' + btmIndent + ' 70,' + btmIndent + ' 90,0 ' +
           '5,' + btmCornerTweak + ' 5,-1 -1,-7 ' +
           'C 50,0 50,0 6,43 ' +
           '0,49 0,' + (50 + btmCornerTweak) + ' 5,50 z')
      .cx(50).y(0)
      .fill('#fff')
    return m
  }

  // m 5,50 c 20,-10 70,-10 90,0 5,2 5,-1 -1,-7 C 50,0 50,0 6,43 0,49 0,52 5,50 z // start.
  // m 5,50 c 20,-1  70,-1  90,0 5,0 5,-1 -1,-7 C 50,0 50,0 6,43 0,49 0,50 5,50 z // flatter bottom.

})()
