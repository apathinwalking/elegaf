function Animation(spritesheet_src, frame_width, frame_height, num_rows, num_cols){
    this.spritesheet = new Image();
    this.spritesheet.srch = spritesheet_src;
    this.frame_width = frame_width;
    this.frame_height = frame_height;
    this.num_rows = num_rows;
    this.num_cols = num_cols;
}
Animation.prototype.spritesheet;
Animation.prototype.frame_width;
Animation.prototype.frame_height;
Animation.prototype.num_cols;
Animation.prototype.num_rows;

Animation.prototype.draw = function(context, row, col, x_position, y_position){
    var spritesheet_x_position = col*this.frame_width;
    var spritesheet_y_position = row*this.frame_height;
    context.drawImage(this.spritesheet, spritesheet_x_position, spritesheet_y_position, x_position, y_position);
};
