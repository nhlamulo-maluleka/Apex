import { api, LightningElement } from 'lwc';
import shoot from '@salesforce/resourceUrl/shooter';

export default class Player extends LightningElement {
    @api pheight;
    @api pwidth;
    @api xpos;
    @api ypos;

    renderedCallback() {
        this.player = this.template.querySelector('[data-player="player"]');
        this.player.style.width = `${this.pwidth}px`
        this.player.style.height = `${this.pheight}px`
        this.player.style.backgroundImage = `url(${shoot}/spacecraft.png)`

        setInterval(() => {
            this.player.style.top = `${this.ypos}px`
            this.player.style.left = `${this.xpos}px`
        }, 100)
    }
}