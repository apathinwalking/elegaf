/** An "abstract class" for a console to print to the screen
 * @param {Object} ctx - the context
 * @param {Object} name - name it
 */
function Console(ctx, name){
    this.context = ctx;
    this.name = name;
    this.line = 0;
    this.context.fillStyle = "rgb(33,33,33)";
    this.context.fillRect(0,0,this.context.canvas.width, this.context.canvas.height);
    this.writeTop();
}
/** Write to the context
 * @param {Object} text - text to write
 */
Console.prototype.write = function(text){
    this.context.fillStyle = "rgb(255,182,193)";
    this.context.font = "12px Lucida; Sans ";
    this.context.fillText(text,11, (this.line*11 + 11));
    this.line+=1;
};
/** Clear all text from the context */
Console.prototype.clear = function(){
    this.context.clearRect(0,0,this.context.canvas.width, this.context.canvas.height);
    this.context.fillStyle = "rgb(33,33,33)";
    this.context.fillRect(0,0,this.context.canvas.width, this.context.canvas.height);
    this.writeTop();
};
/** Write the header for the "console" */
Console.prototype.writeTop = function(){
    var self = this;
    this.context.fillStyle = "rgb(255,182,193)";
    this.context.font = "24px Lucida; Sans";
    this.context.fillText(self.name, 100, 11);
    this.line+=1;
};
// Display console 1
var C1 = new Console(document.getElementById("console1").getContext("2d"), "CONSOLE_1");
var VP = document.getElementById("viewport").getContext("2d");
// Display console 2
var C2 = new Console(document.getElementById("console2").getContext("2d"), "CONSOLE_2");



