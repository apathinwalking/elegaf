//viewport canvas
viewport = document.getElementById("viewport").getContext('2d'); //viewport context



var bb = new BackBuffer(768,1024,3);
var key = new KeyWatcher();
key.addToWatchList("LEFT");
key.addToWatchList("RIGHT");
var q1 = new Quad(0,0,100,0,100,100,0,100);

var gameLoop = function(){
    key.update();
    viewport.clearRect(0,0,viewport.canvas.width, viewport.canvas.height);
    q1.draw(bb.stack[1]);

    //flip the buffer
    pancake = bb.flatten();
    viewport.drawImage(pancake.canvas,0,0);
    bb.flush();

    var left = key.pollKey("LEFT");
    var right = key.pollKey("RIGHT");
    var lrdif = Math.abs(left - right);
    var mod = lrdif/200;

    if (left > 0){
        q1.offset_x-=10*mod;
    }
    if (right > 0)
        q1.offset_x+=10*mod;

};

setInterval(gameLoop, 1000/30);

