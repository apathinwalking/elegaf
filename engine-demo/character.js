/**
 * Essentially a character contains all of the different animations in a sprite sheet
 * This object also provides the functionality to hold a "current animation", which is updated whenever you call update
 * switchAnimation is used to switch animations
 * @param spritesheet - a spritesheet object
 */
function Character(spritesheet){
    this.spritesheet = spritesheet;
}
//The character's spritesheet
Character.spritesheet;
//A container for all of the characters animations
Character.prototype.animations = {};
//The currently active animation
Character.prototype.current_animation = "NONE";
//The current sprite
Character.prototype.current_frame;
/**
 * add an animation to the character
 * @param name - the name of the animation (you name it)
 * @param row - the row in the spritesheet it corresponds to
 * @param start_col - the first column in the animation
 * @param end_col - the last column in the animation
 */
Character.prototype.addAnimation = function(name,row,start_col,end_col){
    this.animations[name] = new Animation(this.spritesheet,row,start_col,end_col);
};
/**
 * Switch the current animation
 * @param name - the animation to switch to
 */
Character.prototype.switchAnimation = function(name){
    this.current_animation = name;
    this.animations[name].reset();
};
/** Updates the current frame **/
Character.prototype.update = function(){
    this.current_frame = this.animations[this.current_animation].getNextFrame();
};