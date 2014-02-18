/** The BackBuffer is a stack of context2Ds which lets you draw at a specified depth
 * Each context2D has the same height and width. But you can draw to them at different offsets.
 * BackBuffer has 3 primary functions which should be called in the game loop.
 * draw - which lets you draw at a specified depth and offset - use this is the draw phase
 * flatten - which draws each context in order of depth. the output needs to be drawn in the viewport - use this after drawing
 * flush - which clears each context - use this after flattening
 * @param {Integer} width - the width of the backbuffer's canvases
 * @param {Integer} height - the height of the backbuffer's canvases
 * @param {Integer} depth - how many layers are there in the BackBuffer
 */
function BackBuffer(width, height, depth){
	this.stack = new Array();
	this.width = width;
	this.height = height;
	this.depth = depth;
	//Add depth-many canvases to the stack
	//The 0th element of the stack is where everything is flattened to. Dont draw to it
	for(i = 0; i <= this.depth; i++){
		var canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		var context = canvas.getContext('2d');
		this.stack[i] = context;
	}
}
BackBuffer.prototype.width; //the width of the BackBuffer's canvases
BackBuffer.prototype.height; //the height of the BackBuffer's canvases
BackBuffer.prototype.depth; //how many layers (the depth of the stack)
BackBuffer.prototype.stack; //a stack of contexts-2Ds
/** Draw something to the BackBuffer at a specified depth and offset.
 * For example, if you draw to depth 1, what you draw will be in the back of everything else
 * @param {canvas} canvas - what is to be drawn
 * @param {Integer} depth - how deep in the stack should it be drawn? default: highest
 * @param {Integer} x - how far to the right to draw? default: 0
 * @param {Integer} y - how far to the left to draw? default: 0
 */
BackBuffer.prototype.draw = function(canvas, depth, x, y){
	if(!depth){
		depth = this.depth;
	}
	if(!x_offset){
		x_offset = 0;
	}
	if(!y_offset){
		y_offset = 0;
	}
	this.stack[depth].drawImage(canvas, x_offset, y_offset);
};
/** Flatten the stack, drawing each element of the stack to the 0th element
 * in order of least to greatest. That is - the depth-th item in the stack will appear on top
 * first, the 0th element gets cleared - to provide a clean slate.
 * The 0th element is then returned.
 */
BackBuffer.prototype.flatten = function(){
	this.stack[0].clearRect(0,0,this.width,this.height);
	for(i = 1; i <= this.depth; i++){
		this.stack[0].drawImage(this.stack[i].canvas,0,0);
	}
	return this.stack[0];
};
/** Clear every context in the stack except the first
 *
 */
BackBuffer.prototype.flush = function(){
	for(i = 1; i <= this.depth; i++){
	    //this.stack[i].setTransform(1, 0, 0, 1, 0, 0);
		this.stack[i].clearRect(0,0,this.width,this.height);
	}
};
