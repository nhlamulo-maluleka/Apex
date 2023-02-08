import { api, LightningElement } from 'lwc';
import getAllContacts from '@salesforce/apex/ContactController.getAllContacts';

export default class LwcOne extends LightningElement {
    @api message = "This is a simple message..."
    result = [];
    filled = false;

    loadContacts(){
        getAllContacts()
        .then(response => {
            this.filled = true;
            this.result = response;
        }).catch(error => {
            this.filled = false;
            console.log(error)
        })
    }

    compData({target: {dataset}}){
        console.log(dataset.id)
    }
}