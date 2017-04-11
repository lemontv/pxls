var fs = require('fs');
var diff = require('color-diff');
var PNGReader = require('png.js');
var colors = require('./colors.json');
var colorNum = colors.length;

fs.readFile('test.png', function(err, buffer){
  var reader = new PNGReader(buffer);
  reader.parse(function(err, png){
    if (err) throw err;
    var width = png.getWidth();
    var height = png.getHeight();
    var pic = [];

    for (var x = 0; x < width; x++) {
      var line = [];
      for (var y = 0; y < height; y++) {
        var pixel = png.getPixel(x, y);
        if (pixel[3] !== 0) {
          var color = diff.closest({
            R: pixel[0],
            G: pixel[1],
            B: pixel[2]
          }, colors)

          for (var index in colors) {
            if(colors[index].R === color.R && colors[index].G === color.G && colors[index].B === color.B) {
              line.push(index);
              break;
            }
          }
        } else {
          line.push(-1);
        }
      }
      pic.push(line);
    }
    console.log(JSON.stringify({
      x: 100,
      y: 100,
      image: pic
    }));
  });
});
