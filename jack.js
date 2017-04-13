const Jack = function (url) {
  const _self = this;
  $.getJSON(url, function(json) { _self.init(json); })
}

Jack.prototype.init = function(raw) {
  this.x = raw.x;
  this.y = raw.y;
  this.width = raw.image[0].length;
  this.height = raw.image.length;
  this.image = raw.image;
}

Jack.prototype.getPixels =  function () {
  const board = document.getElementById('board');
  const ctx = board.getContext('2d');
  const imageData = ctx.getImageData(this.x, this.y, this.width, this.height);
  this.pixels = [];

  for(let y = 0; y < this.height; y++) {
    for(let x = 0; x < this.width; x++) {
      const base = y * this.width * 4 + x * 4;
      let color = '#FFFFFF';

      if (jack.image[y][x] !== -1) {
        color = App.palette[jack.image[y][x]];

        const R = parseInt('0x'+color[1]+color[2]);
        const G = parseInt('0x'+color[3]+color[4]);
        const B = parseInt('0x'+color[5]+color[6]);

        if (imageData.data[base] !== R || imageData.data[base + 1] !== G || imageData.data[base + 2] !== B) {
          this.pixels.push({
            x: jack.x + x,
            y: jack.y + y,
            color: jack.image[y][x]
          })
        }
      }
    }
  }
}

Jack.prototype.draw =  function () {
  const board = document.getElementById('board');
  const ctx = board.getContext('2d');

  for(let i = 0; i < this.pixels.length; i++) {
    const pixel = this.pixels[i];
    ctx.fillStyle = App.palette[pixel.color];
    ctx.fillRect(pixel.x, pixel.y, 1, 1);
  }
}

Jack.prototype.autofill =  function () {
  const _self = this;
  this.pid = setInterval(function() {
    if (new Date() > App.cooldown) {
      _self.getPixels();
      if (_self.pixels.length > 0) {
        const rand = Math.floor(Math.random() * _self.pixels.length);
        const pixel = _self.pixels[rand];
        App.switchColor(pixel.color);
        App.attemptPlace(pixel.x, pixel.y);
        console.log('fill: ', pixel);
      } else {
        _self.stop();
      }
    }
  }, 10000);
}

Jack.prototype.stop =  function () {
  clearInterval(this.pid);
}

