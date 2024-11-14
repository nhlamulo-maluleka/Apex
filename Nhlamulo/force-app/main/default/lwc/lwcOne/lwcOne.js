import { api, LightningElement, wire } from 'lwc';
import getAllContacts from '@salesforce/apex/ContactController.getAllContacts';

export default class LwcOne extends LightningElement {
    @api message = "This is a simple message..."
    result = [];
    filled = false;
    
    // handleChange(e){        
    //     e.target.style.border = `10px solid ${e.target.value}`
    // }

    // isFilled(){ return this.result.length > 0 }

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

    // @wire(getAllContacts)
    // wiredData({error, data}){
    //     if(error) console.log(error)
    //     else {
    //         this.result = data;
    //         console.log(this.result)
    //     }
    // }   
}