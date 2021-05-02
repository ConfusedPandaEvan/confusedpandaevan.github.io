export class Mong {
    constructor(img, stageWidth) {
        this.img = img;

        this.totalFrame = 8;
        this.curFrame = 0;

        this.imgWidth = 235;
        this.imgHeight = 150;

        this.mongWidth = 235;
        this.mongHeight = 150;

        this.mongWidthHalf = this.mongWidth / 2;
        this.x = - (this.mongWidth);
        this.y = 0;
        this.speed = -(Math.random() * 2 + 1);

        this.fps = 5;
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
        this.animate(ctx);
    }

    animate(ctx) {
        this.x -= this.speed;
        
        
        this.y = 700;

        ctx.save();
        ctx.translate(this.x, this.y);
        
        ctx.drawImage(
            this.img,
            this.imgWidth * this.curFrame,
            0,
            this.imgWidth,
            this.imgHeight,
            -this.mongWidthHalf,
            -this.mongHeight + 20,
            this.mongWidth,
            this.mongHeight
        );
        ctx.restore();
    }

    


}