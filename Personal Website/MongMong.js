import {
    Mong
} from "./Mongs.js"

export class MongMongs {
    constructor() {
        this.img = new Image();
        this.img.onload = () => {
            this.loaded();
        };
        this.img.src = 'Mongmongs.png';

        this.items = [];

        this.cur = 0;
        this.isLoaded = false;
    }

    resize(stageWidth,stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    loaded() {
        this.isLoaded = true;
        this.addMong();
    }

    addMong() {
        this.items.push(
            new Mong(this.img, this.stageHeight),
        );
    }

    draw(ctx, t) {
        if (this.isLoaded) {
            this.cur +=1;
            if (this.cur > 600) {
                this.cur = 0;
                this.addMong();
            }

            for (let i = this.items.length - 1; i >= 0; i--) {
                const item = this.items[i];
                if (item.x < -item.width) {
                    this.items.splice(i,1);
                } else {
                    item.draw(ctx, t);
                }
            
            }
        }
    }
}