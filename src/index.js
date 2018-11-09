const WIDTH = 800;
const HEIGHT = 600;

import ts from '../src/tileset platformer.png';
import ch from '../src/nosepass__.png';
var frame =0;
var tileset = new Image();
tileset.src = ts;

var character = new Image();
character.src = ch;


/*


var backBuffer = document.createElement('canvas');
backBuffer.width = WIDTH;
backBuffer.height = HEIGHT;
var backBufferCtx = backBuffer.getContext('2d');

*/


//
// Keyboard handler
//

var Keyboard = {};

Keyboard.LEFT = 37;
Keyboard.RIGHT = 39;
Keyboard.UP = 38;
Keyboard.DOWN = 40;

Keyboard._keys = {};

Keyboard.listenForEvents = function(keys) {
  window.addEventListener('keydown', this._onKeyDown.bind(this));
  window.addEventListener('keyup', this._onKeyUp.bind(this));

  keys.forEach(function(key) {
    this._keys[key] = false;
  }.bind(this));
}

Keyboard._onKeyDown = function(event) {
  var keyCode = event.keyCode;
  if (keyCode in this._keys) {
    event.preventDefault();
    this._keys[keyCode] = true;
  }
};

Keyboard._onKeyUp = function(event) {
  var keyCode = event.keyCode;
  if (keyCode in this._keys) {
    event.preventDefault();
    this._keys[keyCode] = false;
  }
};

Keyboard.isDown = function(keyCode) {
  if (!keyCode in this._keys) {
    throw new Error('Keycode ' + keyCode + ' is not being listened to');
  }
  return this._keys[keyCode];
};

//
// Game object
//

var Game = {};

Game.run = function(context) {
  this.ctx = context;
  this._previousElapsed = 0;

  //var p = this.load();
  //Promise.all(p).then(function(loaded) {
  this.init();
  window.requestAnimationFrame(this.tick);
  //}.bind(this));
};

Game.tick = function(elapsed) {
  window.requestAnimationFrame(this.tick);

  // clear previous frame
  this.ctx.clearRect(0, 0, 560, 450);

  // compute delta time in seconds -- also cap it
  var delta = (elapsed - this._previousElapsed) / 1000.0;
  delta = Math.min(delta, 0.25); // maximum delta of 250 ms
  this._previousElapsed = elapsed;

  this.update(delta);
  this.render();
}.bind(Game);

var map = {
  cols: 50,
  rows: 32,
  tsize: 32,
  layers: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 2, 2, 1, 3, 3, 2, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 2, 1, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 2, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1, 4, 4, 4, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 5, 1, 4, 4, 4, 5, 5, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 4, 5, 5, 5, 5, 3, 3, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 4, 4, 4, 5, 5, 3, 3, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1, 5, 5, 4, 1, 3, 3, 2, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 5, 1, 4, 4, 4, 1, 3, 3, 3, 1, 1, 4, 2, 2, 2, 2, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 4, 5, 5, 1, 2, 3, 3, 1, 1, 4, 1, 1, 1, 1, 1, 5, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 4, 4, 4, 1, 3, 3, 3, 1, 1, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 4, 4, 3, 1, 3, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1, 5, 5, 4, 1, 3, 3, 2, 1, 1, 1, 5, 5, 4, 4, 4, 5, 5, 5, 4, 4, 4, 1, 3, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 4, 4, 4, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 4, 4, 4, 4, 4, 4, 5, 1, 3, 1, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 4, 4, 4, 5, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 1, 1, 1, 3, 3, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 2, 2, 1, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 2, 2, 2, 1, 1, 5, 5, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 5, 5, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1, 5, 5, 5, 5, 5, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  getTile: function(layer, col, row) {
    return this.layers[layer][row * map.cols + col];
  },
  isSolidTileAtXY: function(x, y) {

    var col = Math.floor(x / this.tsize);
    var row = Math.floor(y / this.tsize);

    // loop through all layers and return TRUE if any tile is solid
    return this.layers.reduce(function(res, layer, index) {
      var tile = this.getTile(index, col, row);
      var isSolid = tile === 1 || tile === 2 || tile === 5;
      return res || isSolid;
    }.bind(this), false);
  },
  getCol: function(x) {
    return Math.floor(x / this.tsize);
  },
  getRow: function(y) {
    return Math.floor(y / this.tsize);
  },
  getX: function(col) {
    return col * this.tsize;
  },
  getY: function(row) {
    return row * this.tsize;
  }
};

function Camera(map, width, height) {
  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.maxX = map.cols * map.tsize - width;
  this.maxY = map.rows * map.tsize - height;
}

Camera.prototype.follow = function(sprite) {
  this.following = sprite;
  sprite.screenX = 0;
  sprite.screenY = 0;
};

Camera.prototype.update = function() {
  // assume followed sprite should be placed at the center of the screen
  // whenever possible
  this.following.screenX = this.width / 2;
  this.following.screenY = this.height / 2;

  // make the camera follow the sprite
  this.x = this.following.x - this.width / 2;
  this.y = this.following.y - this.height / 2;
  // clamp values
  this.x = Math.max(0, Math.min(this.x, this.maxX));
  this.y = Math.max(0, Math.min(this.y, this.maxY));

  // in map corners, the sprite cannot be placed in the center of the screen
  // and we have to change its screen coordinates

  // left and right sides
  if (this.following.x < this.width / 2 ||
    this.following.x > this.maxX + this.width / 2) {
    this.following.screenX = this.following.x - this.x;
  }
  // top and bottom sides
  if (this.following.y < this.height / 2 ||
    this.following.y > this.maxY + this.height / 2) {
    this.following.screenY = this.following.y - this.y;
  }
};

function Hero(map, x, y) {
  this.map = map;
  this.x = x;
  this.y = y;
  this.width = 12;
  this.height = 12;
  this.image = character;
  this.xVel = 0;
  this.yVel = 0;
}

Hero.SPEED = 15; // pixels per second

Hero.prototype.move = function(delta, dirx, diry) {
  // move hero
  this.xVel += dirx;
  this.yVel += diry;


  this.xVel = Math.max(-10, Math.min(10, this.xVel));
  this.yVel = Math.max(-10, Math.min(10, this.yVel));


  this.x += this.xVel * Hero.SPEED * delta;
  this.y += this.yVel * Hero.SPEED * delta;

  // check if we walked into a non-walkable tile
  this._collide(this.xVel, this.yVel, delta);

};

Hero.prototype._collide = function(dirx, diry, delta) {
  var row, col;
  // -1 in right and bottom is because image ranges from 0..63
  // and not up to 64
  var left = this.x;
  var right = this.x + this.width;
  var top = this.y - 5;
  var bottom = this.y + this.height - 5;

  // check for collisions on sprite sides

  var LT = this.map.isSolidTileAtXY(left, top);
  var RT = this.map.isSolidTileAtXY(right, top);
  var RB = this.map.isSolidTileAtXY(right, bottom);
  var LB = this.map.isSolidTileAtXY(left, bottom);
  var collision = LT || RT || RB || LB;

  if (!collision) {
    return;
  }

  if ((LT && RT && this.yVel < 0) || (LB && RB && this.yVel > 0)) {
    this.y -= this.yVel * Hero.SPEED * delta;
    this.yVel *= -.2;
  }
  if ((LT && LB && this.xVel < 0) || (RT && RB && this.xVel > 0)) {
    this.x -= this.xVel * Hero.SPEED * delta;
    this.xVel *= -.2;
  }
};

Game.load = function() {
  //wait??
  return;
}

Game.init = function() {
  Keyboard.listenForEvents(
    [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
  this.tileAtlas = tileset;
  this.hero = new Hero(map, 400, 400);
  this.camera = new Camera(map, 300, 250);
  this.camera.follow(this.hero);
};

Game.update = function(delta) {
  // handle hero movement with arrow keys
  var dirx = 0;
  var diry = 0;
  //diry += .02 * 1/Math.abs(diry); gravity is on HOLD

  if (Keyboard.isDown(Keyboard.LEFT))
    dirx -= 1;
  if (Keyboard.isDown(Keyboard.RIGHT))
    dirx += 1;
  if (Keyboard.isDown(Keyboard.UP))
    diry -= 1;
  if (Keyboard.isDown(Keyboard.DOWN))
    diry += 1;


  this.hero.move(delta, dirx, diry);
  this.camera.update();
};

Game._drawLayer = function(layer) {
  var startCol = Math.floor(this.camera.x / map.tsize);
  var endCol = startCol + (this.camera.width / map.tsize) + 1;
  var startRow = Math.floor(this.camera.y / map.tsize);
  var endRow = startRow + (this.camera.height / map.tsize) + 1;
  var offsetX = -this.camera.x + startCol * map.tsize;
  var offsetY = -this.camera.y + startRow * map.tsize;

  for (var c = startCol; c <= endCol; c++) {
    for (var r = startRow; r <= endRow; r++) {
      var tile = map.getTile(layer, c, r);
      var x = (c - startCol) * map.tsize + offsetX;
      var y = (r - startRow) * map.tsize + offsetY;
      if (tile !== 0) { // 0 => empty tile
        this.ctx.drawImage(
          this.tileAtlas, // image
          (tile - 1) * map.tsize + 1, // source x
          0, // source y
          map.tsize, // source width
          map.tsize, // source height
          Math.round(x), // target x
          Math.round(y), // target y
          //map.tsize * 2, // target width
          40,
          map.tsize // target height
        );
      }
    }
  }
};



Game.render = function() {
  // draw map background layer
  this._drawLayer(0);
  var ctx = document.getElementById('screenBuffer').getContext('2d');
  var f = 0;
  var th = 3;
  if (this.hero.xVel > th && this.hero.yVel > th)
    f = 7
  else if (this.hero.xVel < -th && this.hero.yVel > th)
    f = 6
  else if (this.hero.xVel < -th && this.hero.yVel < -th)
    f = 5
  else if (this.hero.xVel > th && this.hero.yVel < -th)
    f = 4
  else if (this.hero.xVel <0 && Math.abs(this.hero.xVel)>Math.abs(this.hero.yVel))
    f = 3
    else if (this.hero.yVel >0 && Math.abs(this.hero.yVel)>Math.abs(this.hero.xVel))
    f = 2
  else if (this.hero.xVel>0 && Math.abs(this.hero.xVel)>Math.abs(this.hero.yVel))
    f = 1
  else
    f = 0



  ctx.drawImage(this.hero.image, 12 * frame, 12 * f, 12, 12, 148.5, 119, 12, 12);
};

//
// start up function
//

window.onload = function() {
  var context = document.getElementById('screenBuffer').getContext('2d');
  context.scale(2, 2);
  Game.run(context);
  setInterval(function(){ frame=(frame+1)%2;}, 200);

};
