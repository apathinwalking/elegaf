function Quad(x1,y1,x2,y2,x3,y3,x4,y4,offset_x,offset_y,r,g,b){
    if (!r){r = Math.floor(Math.random()*255);}
    if (!g){g = Math.floor(Math.random()*255);}
    if (!b){b = Math.floor(Math.random()*255);}
    if(!offset_x){offset_x = 0;}
    if(!offset_y){offset_y = 0;}


    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.x4 = x4;
    this.y4 = y4;
    this.offset_x = offset_x;
    this.offset_y = offset_y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.rgb = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
}

Quad.prototype.draw = function(context){

    context.beginPath();
    context.lineWidth=0;
    context.moveTo(this.x1 + this.offset_x, this.y1 + this.offset_y);
    context.lineTo(this.x2 + this.offset_x, this.y2 + this.offset_y);
    context.lineTo(this.x3 + this.offset_x, this.y3 + this.offset_y);
    context.lineTo(this.x4 + this.offset_x, this.y4 + this.offset_y);
    context.closePath();
    context.fillStyle = this.rgb;
    context.fill();
};

