// Vector2 class made by Sybren Lukkien ( 2021 ) 
// lukky.nl

class Vector2{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    normalize(){
        if(this.x == 0 && this.y == 0){
            return;
        }
        var length = Math.sqrt((this.x*this.x)+(this.y*this.y));
        this.x = this.x/length;
        this.y = this.y/length;
    }

    multiply(vec2){
        this.x = this.x*vec2.x;
        this.y = this.y*vec2.y;
    }

    rotate(angle){
        var rad = angle * (Math.PI/180);
        var newX = (this.x)*Math.cos(rad) - (this.y)*Math.sin(rad);
        var newY = (this.x)*Math.sin(rad) + (this.y)*Math.cos(rad);
        this.x = newX;
        this.y = newY;
    }

    setRotation(angle){
        var amountToRotate = angle - this.rotation;
        this.rotate(amountToRotate);
    }

    draw(ctx,color,offset){
        if(!offset){
            offset = new Vector2(0,0);
        }
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(offset.x, offset.y);
        ctx.lineTo(offset.x + this.x, offset.y + this.y);
        ctx.stroke();
    }

    static normalize(vec2){
        
        if(vec2.x == 0 && vec2.y == 0){
            return new Vector2(0,0);
        }
        if(vec2){
            var length = Math.sqrt((vec2.x*vec2.x)+(vec2.y*vec2.y));
            return new Vector2(vec2.x/length,vec2.y/length);
        }
        return new Vector2(0,0);
    }

    static multiply(vec2a,vec2b){
        if(vec2a && vec2b){
            return new Vector2(vec2a.x*vec2b.x,vec2a.y*vec2b.y);
        }
        return null;
    }

    static rotate(angle,vec2){
        var rad = angle * (Math.PI/180);
        if(vec2){
            var newX = (vec2.x)*Math.cos(rad) - (vec2.y)*Math.sin(rad);
            var newY = (vec2.x)*Math.sin(rad) + (vec2.y)*Math.cos(rad);
            return new Vector2(newX,newY);
        }
        return null;
    }

    static setRotation(angle,vec2){
        if(vec2){
            var amountToRotate = angle - vec2.rotation;
            vec2.rotate(amountToRotate);
            return new Vector2(vec2.x,vec2.y);
        }
        return null;
    }

    static draw(ctx,color,vec2,offset){
        if(!offset){
            offset = new Vector2(0,0);
        }
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(offset.x, offset.y);
        ctx.lineTo(offset.x + vec2.x, offset.y + vec2.y);
        ctx.stroke();
    }

    get rotation(){
        var angleDeg = Math.atan2(this.y, this.x) * 180 / Math.PI;
        
        if(angleDeg<0){
            angleDeg += 360;
        }
        return angleDeg
    }

    get length(){
        return Math.sqrt((this.x*this.x)+(this.y*this.y));
    }

    get right(){
        return Vector2.rotate(90,this);
    }

    get left(){
        return Vector2.rotate(-90,this);
    }

    get backwards(){
        return Vector2.multiply({x:-1,y:-1},this);
    }
}
