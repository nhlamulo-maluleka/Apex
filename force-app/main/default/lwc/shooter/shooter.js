import { LightningElement } from 'lwc';

export default class Shooter extends LightningElement {
    width = 700;
    height = 550;
    offset = 8;
    playerheight = 15;
    playerwidth = 50;
    dx = 10;

    missileWidth

    // Player movement
    x = 0;
    y = this.height - (this.playerheight + this.offset);

    constructor(){
        super();
    }

    renderedCallback(){
        this.key = this.template.querySelector('[data-input="key"]');
        // console.log("Has Focus", this.key.hasFocus())
        
        this.key.addEventListener("focus", e => {
            e.target.style.border = '5px solid green';
        })
        
        this.key.addEventListener("blur", e => {
            e.target.style.border = '5px solid red';
        })
    }

    keyDown({key, target}){
        switch(key){
            case "ArrowLeft":
                this.x -= this.dx;

                if(this.x < 0) this.x = 0
                break;
            case "ArrowRight":
                this.x += this.dx;

                if(this.x > (this.width-(this.playerwidth + this.offset))) this.x = (this.width-(this.playerwidth + this.offset))
                break;
            case "Control":
                this.soldier = this.template.querySelector("c-shooter-canvas")
                this.soldier.invokeMissile();
                break;
        }

        // Preventing the input box to hold inputs
        target.value = null;
    }

    inputFocus({target}){
        console.log(target.focus)
    }
}