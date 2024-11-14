import { api, LightningElement, wire } from 'lwc';

export default class Missile extends LightningElement {
    // renderedCallback(){
    //     this.missile = this.template.querySelector('[data-missile="missile"]');     
    // }

    @api
    launchMissile(top, left){
        this.missile = this.template.querySelector('[data-missile="missile"]');     

        this.mMissile = setInterval(() => {
            this.missile.style.top = `${top}px`        
            this.missile.style.left = `${left}px`

            top -= 5;
            // When missile reaches the top, stop the interval to release resources
            if(top < 0) clearInterval(this.mMissile);
        }, 100)
    }
}