export class Duck {
    constructor(img, stageWidth) {
        this.img = img;

        this.totalFrame = 8;
        this.curFrame = 0;

        this.imgWidth = 160;
        this.imgHeight = 135;

        this.duckWidth = 160;
        this.duckHeight = 135;

        this.duckWidthHalf = this.duckWidth / 2;
        this.x = stageWidth + this.duckWidth;
        this.y = 0;
        this.speed = Math.random() * 2 + 1;

        this.fps = 10;
        this.fpsTime = 1000 / this.fps;
    }

    draw(ctx, t, dots) {
        if (!this.time) {
            this.time = t;
        }

        const now = t - this.time;

        // this will look at the actual time to increase the fps of the image
        if (now > this.fpsTime) {
            this.time = t;
            this.curFrame += 1;
            if (this.curFrame == this.totalFrame) {
                this.curFrame = 0;
            }
        }
        this.animate(ctx, dots);
    }

    animate(ctx, dots) {
        this.x -= this.speed;
        const closest = this.getY(this.x, dots);
        this.y = closest.y;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(closest.rotation);
        ctx.drawImage(
            this.img,
            this.imgWidth * this.curFrame,
            0,
            this.imgWidth,
            this.imgHeight,
            -this.duckWidthHalf,
            -this.duckHeight + 20,
            this.duckWidth,
            this.duckHeight
        );
        ctx.restore();
    }
//This will calculate the Y value for the ducks based on the x,y cordinates of the front hill
    getY(x, dots) {
        for (let i = 1; i < dots.length; i++) {
            if (x >= dots[i].x1 && x <= dots[i].x3) {
                return this.getY2(x, dots[i]);
            }
        }

        return {
            y: 0,
            rotation: 0
        };
    }
//this will divide the front x cordinate and the back x cordinate based on the duck's position and get a y value based on the quadratic function
    getY2(x, dot) {
        const total = 200;
        let pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, 0);
        let prevX = pt.x;
        for (let i = 1; i < total; i++) {
            const t = i / total;
            pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, t);

            if (x >= prevX && x <= pt.x) {
                return pt;
            }
            prevX = pt.x;
        }
        return pt
    }

    getQuadValue(p0, p1, p2, t) {
        return (1-t) * (1-t) * p0 + 2 * (1-t) * t * p1 + t * t * p2;
    }
//This will give the rotation for the duck based on the quadratic function and calculating the tangent line
    getPointOnQuad(x1, y1, x2, y2, x3, y3, t) {
        const tx = this.quadTangent(x1, x2, x3, t);
        const ty = this.quadTangent(y1, y2, y3, t);
        // need to add 90degrees since the angle is perpendicular
        const rotation = -Math.atan2(tx, ty) + (90 * Math.PI / 180);
        
        return {
            x: this.getQuadValue(x1, x2, x3, t),
            y: this.getQuadValue(y1, y2, y3, t),
            rotation: rotation,
        };
    }
//function I got from wikipedia on tangent line from a curve
    quadTangent(a, b, c, t) {
        return 2 * (1-t) * (b - a) + 2 * (c-b) * t;
    }


}
