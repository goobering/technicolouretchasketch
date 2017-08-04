var currentX, currentY, targetColor;

window.addEventListener('load', function(){
    var canvas = document.querySelector('#main-canvas');
    var context = canvas.getContext("2d");

    var colorPicker = document.querySelector('#input-color');
    colorPicker.addEventListener('change', function(event){
        onColorChanged(event, context);
    });

    currentX = 0;
    currentY = canvas.height;

    document.onkeydown = onKeyDown;
});

var onColorChanged = function(event, context){
    targetColor = event.target.value;
};

//Code lifted from: https://stackoverflow.com/a/9310900
var onKeyDown = function(e){
    var canvas = document.querySelector('#main-canvas');
    var context = canvas.getContext("2d");

    e = e || window.event;

    console.log(context.fillStyle);
    console.log(targetColor);
    if(context.fillStyle !== targetColor){
        context.fillStyle = r2h(interpolateColor(h2r(targetColor), h2r(context.fillStyle)));
    }
    console.log(context.fillStyle);
    console.log(targetColor);

    if (e.keyCode == '38' && currentY >= 5) {
        // up arrow 
        currentY -= 5;
    }
    else if (e.keyCode == '40' && currentY <= canvas.height) {
        // down arrow
        currentY += 5;
    }
    else if (e.keyCode == '37' && currentX >= 5) {
        // left arrow
        currentX -= 5;
    }
    else if (e.keyCode == '39' && currentX <= canvas.width) {
        // right arrow
        currentX += 5;
    };

    drawCircle(currentX, currentY, context);
}

var drawCircle = function(x, y, context){
    context.beginPath();
    context.arc(x, y, 10, 0, 2*Math.PI);
    context.fill();
};

// Converts a #ffffff hex string into an [r,g,b] array
var h2r = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
};

// Inverse of the above
var r2h = function(rgb) {
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
};

var interpolateColor = function(color1, color2, factor) {
  if (arguments.length < 3) { factor = 0.9; }
  var result = color1.slice();
  for (var i=0;i<3;i++) {
    result[i] = Math.round(result[i] + factor*(color2[i]-color1[i]));
  }
  return result;
};

