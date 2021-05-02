import {
    Duck
} from "./duck.js"
//This is a controller for the number of Ducks in the screen
export class RubberDucks {
    constructor() {
        this.img = new Image();
        this.img.onload = () => {
            this.loaded();
        };
        this.img.src = 'RubberDuckies.png';

        this.items = [];

        this.cur = 0;
        this.isLoaded = false;
    }
//resizes based on the screen size
    resize(stageWidth,stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    loaded() {
        this.isLoaded = true;
        this.addDuck();
    }

    addDuck() {
        this.items.push(
            new Duck(this.img, this.stageWidth),
        );
    }

    draw(ctx, t, dots) {
        if (this.isLoaded) {
            this.cur +=1;
            if (this.cur > 200) {
                this.cur = 0;
                this.addDuck();
            }
//if the duck moves out of the screen, the duck is removed and a new duck is drawn
            for (let i = this.items.length - 1; i >= 0; i--) {
                const item = this.items[i];
                if (item.x < -item.width) {
                    this.items.splice(i,1);
                } else {
                    item.draw(ctx, t, dots);
                }
            
            }
        }
    }
}
