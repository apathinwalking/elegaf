//REPLACE YOUR NORMAL game_engine.js FILE WITH THIS ONE TO MAKE IT RUN

/** This function is for actually drawing everything to the backbuffer, and then flipping it **/
function Draw(self){
    self.viewport.clearRect(0,0,self.viewport.canvas.width, self.viewport.canvas.height); //do not edit this line
    /********************************/
    /**PUT YOUR DRAWING CODE BELOW**/
    /*******************************/
    self.viewport.fillStyle = "rgb(200,150,150)"; //background fill color - change or remove this if you want
    //fill background - change or remove the line below if you want
    self.viewport.fillRect(0,0,self.viewport.canvas.width,self.viewport.canvas.height);

    var arie_current_sprite = self.arie.current_frame;
    var heidi_current_sprite = self.heidi.current_frame;
    self.backbuffer.stack[4].drawImage(arie_current_sprite.canvas,50,0);
    self.backbuffer.stack[3].drawImage(heidi_current_sprite.canvas,self.heidi_xpos,0);
    self.backbuffer.stack[1].drawImage(self.trees.image,self.arie_xoff1,0);
    self.backbuffer.stack[2].drawImage(self.grass.image,self.arie_xoff2,0);
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

    //update arie's current frame
    self.arie.update();
    self.heidi.update();
    /********************************/
    /**PUT YOUR UPDATING CODE BELOW**/
    /*******************************/
    self.heidi_xpos+=self.heidi_xvel;
    self.heidi_xvel+=self.heidi_xacc;

    self.arie_xoff1-=self.arie_xvel;
    self.arie_xoff2-=(self.arie_xvel*2);

    var right = self.key.pollKey("RIGHT");

    if(right == 2){
        self.arie.switchAnimation("walk_r");
    }
    if(right == 18){
        self.arie.switchAnimation("run_r");
    }
    else if(right < 0){
        self.arie.switchAnimation("stand_r");
    }

    if(self.arie.current_animation == "walk_r"){
        self.arie_xvel = 6;
    }
    else if(self.arie.current_animation == "run_r"){
        self.arie_xvel = 13;
    }
    else if(self.arie.current_animation == "stand_r"){
        self.arie_xvel = 0;
    }

}
/**Put any initialization code you need here, like characters, or any keys you need to add the the keywatcher **/
function Initialize(self){
    self.viewport = document.getElementById("viewport").getContext('2d');
    self.backbuffer = new BackBuffer(self.viewport.canvas.width,self.viewport.canvas.height,10); //you can change the 'depth' here
    self.key = new KeyWatcher(); //do not edit this line

    /**************************************/
    /**PUT YOUR INITIALIZATION CODE BELOW**/
    /**************************************/

    //adding keys to the watchlist
    key.addToWatchList("LEFT");
    key.addToWatchList("RIGHT");

    //generating spritesheets
    self.heidi_ss = new Spritesheet("spritesheets/heidi_spritesheet.png",6,2,128,128);
    self.arie_ss = new Spritesheet("spritesheets/arie_spritesheet.png",7,4,64,128);

    //Set 3 animations for character arie, and set standing right as the default
    self.arie = new Character(arie_ss);
    self.arie.addAnimation("walk_r",0,1,6);
    self.arie.addAnimation("run_r",1,1,6);
    self.arie.addAnimation("stand_r",0,0,0);
    self.arie.switchAnimation("stand_r");

    self.arie_xoff1 = 0; //initial x_offset
    self.arie_xoff2 = 0;
    self.arie_xvel = 0; //initial x_velocity

    //set one animation for the dog
    self.heidi = new Character(heidi_ss);
    self.heidi.addAnimation("run_r2", 1,0,5);
    self.heidi.switchAnimation("run_r2");

    self.heidi_xpos = 0;
    self.heidi_xvel = 15;
    self.heidi_xacc = 1.5;

    //generating background elements
    self.trees = new BackgroundElement("background-elements/bg_trees.png",2);
    self.grass = new BackgroundElement("background-elements/bg_grass.png",1);
}

/**
 * Start the game - call initialization code, and start the gameloop - DO NOT EDIT THIS CODE
 * @fps - frames per second your game will run at
 */
function StartGame(fps){
    var self = this;
    Initialize(self);
    //calls Update and Draw over and over
    setInterval(function(){Update(self);Draw(self);}, 1000/fps);
}