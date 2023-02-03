import { api, LightningElement } from 'lwc';

class Missile{
    constructor() {
        this.dy = 10;
    }

    missileLaunched(mobject) {
        const misObject = mobject;
        this.missileTimer = setInterval(() => {
            const prevTop = parseInt((misObject.style.top).replace("px", ""))
            misObject.style.top = `${prevTop - this.dy}px`

            if (prevTop < 0) {
                misObject.remove();
                clearInterval(this.missileTimer);
            }
        }, 50)
    }
}

export default class ShooterCanvas extends LightningElement {
    @api width;
    @api height;
    @api px;
    @api py;
    @api playerheight;
    @api playerwidth;
    // Missiles shot!!
    constructor() {
        super()
        this.missiles = [];
        this.count = 0;
    }

    renderedCallback() {
        this.canvas = this.template.querySelector('[data-id="canvas"]');
        this.canvas.style.width = `${this.width}px`
        this.canvas.style.height = `${this.height}px`
    }

    createMissile() {
        const el = document.createElement("div")
        el.style.position = 'absolute'
        el.style.width = '20px'
        el.style.height = '20px'
        el.style.backgroundColor = 'red'
        el.style.top = `${this.height - (this.playerheight + 30)}px`
        el.style.left = `${this.px + (parseInt(this.playerwidth/2) - 10) | 0}px`
        el.style.zIndex = '999'
        el.style.transition = 'all .2s'
        el.style.borderRadius = "50%"

        const id = `missile${this.count}`;
        el.dataset["missile"] = id

        // Add the missile to the canvas
        this.canvas.appendChild(el);

        // Increment the missile count!!!
        this.count += 1;

        // Add the reference to the list
        return this.template.querySelector(`[data-missile="${id}"]`)
    }

    @api
    invokeMissile() {
        const mObject = new Missile();
        mObject.missileLaunched(this.createMissile());
    }
}