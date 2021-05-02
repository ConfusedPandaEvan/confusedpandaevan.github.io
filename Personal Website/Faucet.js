export class Faucet {
    constructor() {
        this.img = new Image;

        this.img.src = 'Faucet.png';

        this.imgWidth = 400;
        this.imgHeight = 750;

        this.totalFrame = 6;
        this.curFrame = 6;

        this.fps = 10;
        this.fpsTime = 5000 / this.fps;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.x = this.stageWidth - this.imgWidth;
        this.y = this.imgHeight;
    }

    draw(ctx, t) {
        
        if (!this.time) {
            this.time = t;
        }

        const now = t - this.time;

        // this will look at the actual time to increase the fps of the image
        if (now > this.fpsTime) {
            this.time = t;
            this.curFrame -= 1;
            if (this.curFrame == -1) {
                this.curFrame = this.totalFrame -1;
            }
        }
        this.animate(ctx);
    }

    animate(ctx) {
        // console.log(this.img, this.x, this.y, this.imgWidth, this.imgHeight);
        ctx.drawImage(
            this.img,
            this.imgWidth * this.curFrame,
            0,
            this.imgWidth,
            this.imgHeight,
            this.stageWidth - this.imgWidth,
            0,
            this.imgWidth,
            this.imgHeight
        );
        ctx.restore();
    }
}