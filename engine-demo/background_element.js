/**
 * An image to render in the background, behind the characters
 * @param src - the image source
 * @param depth - a multiplier which tells us how fast it moves when the player moves
 * @constructor
 */
function BackgroundElement(src,depth){
    this.src = src;
    this.image = new Image();
    this.image.src = this.src;
}
BackgroundElement.prototype.src;
BackgroundElement.prototype.depth;
BackgroundElement.prototype.image;