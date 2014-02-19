/**
 * Holds one cycle of animation, which corresponds to one row in a spritesheet
 * you must call reset to begin the animation - and call getNextFrame during every frame that you intend to use the
 * animation.
 * @param spritesheet - a spritesheet object
 * @param row - the row of the spritesheet this animation corresponds to
 * @param start_col - the column of the spritesheet to start the cycle with
 * @param end_col - the column of the spritesheet to end the cycle with
 */
function Animation(spritesheet, row, start_col, end_col){
    this.spritesheet = spritesheet;
    this.row = row;
    this.start_col = start_col;
    this.end_col = end_col;
    this.current_col = this.start_col;
}
//A spritesheet object
Animation.prototype.spritesheet;
//Column to begin the animation at
Animation.prototype.start_col;
//Column to end the animation at
Animation.prototype.end_col;
//Row of spritesheet in which animation resides
Animation.prototype.row;
//Holds the current frame in the animation
Animation.prototype.current_col;
/** resets the current_col **/
Animation.prototype.reset = function(){
    this.current_col = this.start_col;
};
/**
 * gets the next frame from the spritesheet and adds 1 to current col
 * loops around if the current_col is the same as the end_col
 * @returns {CanvasRenderingContext2D|*} - the next frame
 */
Animation.prototype.getNextFrame = function(){
    //get the next frame from the spritesheet
    var next_frame = this.spritesheet.getFrame(this.row,this.current_col);
    //repeat the cycle
    if(this.current_col == this.end_col){
        this.current_col = this.start_col;
    }
    //add one to the current_col
    this.current_col+=1;
    return next_frame;
};
