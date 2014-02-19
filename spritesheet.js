/**
 * An object to hold a spritesheet
 * @param src - the actual file the spritesheet comes from
 * @param num_rows - the number of rows in the spritesheet
 * @param num_cols - the number of columns in the spritesheet
 * @param frame_width - the width of one frame in the spritesheet
 * @param frame_height - the height of one frame in the spritesheet
 */
function Spritesheet(src,num_rows,num_cols,frame_width,frame_height){
    this.src = src;
    this.num_rows = num_rows;
    this.num_cols = num_cols;
    this.image = new Image();
    this.image.src = this.src;
    this.frame_width = frame_width;
    this.frame_height = frame_height;
    var canvas = document.createElement('canvas');
    canvas.width = this.frame_width;
    canvas.height = this.frame_height;
    this.frame = canvas.getContext('2d');
}
//The image of the spritesheet
Spritesheet.prototype.image;
//the file directory of the spritesheet
Spritesheet.prototype.src;
//the number of rows in the sprite sheet
Spritesheet.prototype.num_rows;
//the number of columns in the sprite sheet
Spritesheet.prototype.num_cols;
//the width of one frame in the sprite sheet
Spritesheet.prototype.frame_width;
//the height of one frame in the spritesheet
Spritesheet.prototype.frame_height;
//a context2d for printing on frame of the spritesheet
Spritesheet.prototype.frame;
/**
 * gets a context2d of a specific frame in the spritesheet
 * @param row - the row of the frame
 * @param col - the column of the frame
 * @returns {CanvasRenderingContext2D|*}
 */
Spritesheet.prototype.getFrame = function(row,col){
    //clear the canvas
    this.frame.clearRect(0,0,this.frame_width,this.frame_height);
    //x-position of top left of frame
    var x = col*this.frame_width;
    //y-position of top right of frame
    var y = row*this.frame_height;
    C1.write(x);
    C2.write(y);
    //draw the frame
    this.frame.drawImage(this.image,x,y,this.frame_width,this.frame_height,0,0,this.frame_width,this.frame_height);
    return this.frame;
};