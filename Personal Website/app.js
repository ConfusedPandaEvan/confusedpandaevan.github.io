import {
    Hill
} from './hill.js';

import {
    RubberDucks
} from './RubberDucks.js';

import {
    MongMongs
} from './MongMong.js';

import {
    Faucet
} from './Faucet.js';


document.addEventListener('wheel',
        onScroll);
function onScroll(event) {
    scroll.y = event.deltaY
    if (app){
    
        app.fronthill.setY(scroll.y);
        if (app.fronthill.overflow){
            end();
        }
    }
    return scroll.y;
}
class App{
    constructor() {
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.faucet = new Faucet();
        console.log(this.faucet)
        this.backhill = new Hill('rgba(95, 92, 254, 0.7)', 0.8, 7);
        this.midhill = new Hill('rgba(92, 137, 254, 1)', 1.2, 6);
        this.fronthill = new Hill('rgba(92, 196, 254, 0.7)', 1.5, 5);

        this.rubberDucks = new RubberDucks();

        this.mongMongs = new MongMongs();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.faucet.resize(this.stageWidth, this.stageHeight);

        
        this.backhill.resize(this.stageWidth, this.stageHeight);
        this.midhill.resize(this.stageWidth, this.stageHeight);
        this.fronthill.resize(this.stageWidth, this.stageHeight);
        

        this.rubberDucks.resize(this.stageWidth, this.stageHeight);
        this.mongMongs.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0,0, this.stageWidth, this.stageHeight);

        this.backhill.draw(this.ctx);

        this.faucet.draw(this.ctx, t);

        this.midhill.draw(this.ctx);

        this.mongMongs.draw(this.ctx, t)

        let dots;
        
        dots = this.fronthill.draw(this.ctx);
        
        
        this.rubberDucks.draw(this.ctx, t, dots)
        
    }

    
}
let app;
let newish;
let ended = 0;
function end(){
    if (!ended){
        ended = 1
    
    app = null;
    let html = document.getElementsByTagName("html")[0];
    let body = html.getElementsByTagName("body")[0];
    let canv = body.getElementsByTagName("canvas")[0];
    console.log(html.getElementsByTagName("body")[0].childNodes)
    body.removeChild(canv)
    document.getElementById('after').style.display = 'inline'
    }
}
window.onload = () => {
    
    app = new App();
    document.getElementById("after").style.display = 'none'
}