export class Hill {
    // constructor gets color, speed as parameter to make multiple waves 
    constructor(color, speed, total) {
        this.color = color;
        this.speed = speed;
        this.total = total;
        this.overflow = false;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.points = [];
        
        // gap is larger than the stage so that ducks can come in from the side of the screen more naturally
        this.gap = Math.ceil(this.stageWidth / (this.total - 2));
        
        for (let i = 0; i < this.total; i++) {
            this.points[i] = {
                x: i * this.gap,
                y: this.getY()
            };
            
        }
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let cur = this.points[0];
        let prev = cur;
        // each coordinates will be used to track ducks
        let dots = [];
        cur.x += this.speed;
        
        if (cur.x > -this.gap) {
            this.points.unshift({
                x: -(this.gap * 2),
                y: this.getY()
            });
        } else if (cur.x > this.stageWidth + this.gap) {
            //this will delete the point that is outside of the screen
            this.points.splice(-1);
        }

        ctx.moveTo(cur.x, cur.y);


        let prevCx = cur.x;
        let prevCy = cur.y;
        
        

        for (let i = 1; i < this.points.length; i++) {
            cur = this.points[i];
            cur.x += this.speed;
            
            const cx = (prev.x + cur.x) / 2;
            const cy = (prev.y + cur.y) / 2;
            
            // making the curvy waves with quatratic function
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
            
            // return coordinates
            dots.push({
                x1: prevCx,
                y1: prevCy,
                x2: prev.x,
                y2: prev.y,
                x3: cx,
                y3: cy,
            });
            
            
            prev = cur;
            prevCx = cx;
            prevCy = cy;
        }
        
        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();

        return dots;

    }
    
    
    
    getY() {
        var scroll = {
            x: undefined,
            y: undefined
        }

        
        const min = this.stageHeight / 2;
        const max = this.stageHeight / 2;
        return min + Math.random() * max;
    }
//y value will be random within a range but it will shift based on the user's scroll
    setY(value){
        for (let i = 0; i < this.points.length; i++){
            if (i == 5){
                console.log(this.points[i].y);
            }
            this.points[i].y+=value
            
            if (this.points[i].y < -400) {
                this.overflow = true;
                
            }
        }
    }
}
