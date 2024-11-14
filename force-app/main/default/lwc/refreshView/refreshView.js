import { LightningElement } from 'lwc';
import { RefreshEvent } from 'lightning/refresh'

export default class RefreshView extends LightningElement {
    connectedCallback(){
        this.dispatchEvent(new RefreshEvent())
    }
}