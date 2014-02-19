/** Simply calls update and draw over and over again do not edit this**/
function GameLoop(self){
    Update(self); //do not edit this line
    Draw(self); //do not edit this line
}
/** This function is for actually drawing everything to the backbuffer, and then flipping it **/
function Draw(self){
    self.viewport.clearRect(0,0,self.viewport.canvas.width, self.viewport.canvas.height); //do not edit this line
    /********************************/
    /**PUT YOUR DRAWING CODE BELOW**/
    /*******************************/

    self.viewport.fillStyle = "rgb(200,150,150)"; //background fill color - change or remove this if you want
    //fill background - change or remove the line below if you want
    self.viewport.fillRect(0,0,self.viewport.canvas.width,self.viewport.canvas.height);

    /******************************/
    /**END YOUR DRAWING CODE HERE**/
    /******************************/
    var pancake = self.backbuffer.flatten(); //flattening the backbuffer, don't edit this line
    self.viewport.drawImage(pancake.canvas,0,0); //draw the "pancake" to the viewport - do not edit this line
    self.backbuffer.flush();
}

/** This function is for any data crunching you have to do **/
function Update(self){
    self.key.update(); //do not edit this line

    /********************************/
    /**PUT YOUR UPDATING CODE BELOW**/
    /*******************************/
}
/**Put any initialization code you need here, like characters, or any keys you need to add the the keywatcher **/
function Initialize(self){
    self.viewport = document.getElementById("viewport").getContext('2d');
    self.backbuffer = new BackBuffer(viewport.canvas.width,viewport.canvas.height,10); //you can change the 'depth' here
    self.key = new KeyWatcher(); //do not edit this line

    /**************************************/
    /**PUT YOUR INITIALIZATION CODE BELOW**/
    /**************************************/

    //ex: key.addToWatchList("LEFT");
    //ex: key.addToWatchList("RIGHT");
}

/**
 * Start the game - call initialization code, and start the gameloop - DO NOT EDIT THIS CODE
 * @fps - frames per second your game will run at
 */
function StartGame(fps){
    var self = this;
    Initialize(self);
    setInterval(GameLoop(self), 1000/fps);
}