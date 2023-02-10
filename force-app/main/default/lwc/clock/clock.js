import { LightningElement, wire } from 'lwc';
import bgClock from '@salesforce/resourceUrl/clock';
import fetchNextUpdate from '@salesforce/apex/CheckUpdates.fetchNextUpdate';

export default class Clock extends LightningElement {
    hours = 0;
    minutes = 0;
    seconds = 0;
    nextUpdate = {};
    allUpdates = [];
    
    @wire(fetchNextUpdate)
    getNextLoadsheddingSchedule(){
        fetchNextUpdate({block: 16})
        .then(data => {
            this.nextUpdate = data;
        }).catch(err => console.error(err))
    }

    renderedCallback(){
        this.hoursObject = this.template.querySelector('[data-hours="hours"]')
        this.minutesObject = this.template.querySelector('[data-minutes="minutes"]')
        this.secondsObject = this.template.querySelector('[data-seconds="seconds"]')
        this.clock = this.template.querySelector('[data-root="root"]')

        this.clock.style.backgroundImage = `url(${bgClock})`

        setInterval(() => {
            const date = new Date();

            const hourShift = 30*(date.getMinutes()/60);

            this.hours = parseInt(((date.getHours() > 12 ? date.getHours() - 12 : date.getHours())/12)*360);
            this.hoursObject.style.transform = `rotate(${this.hours+hourShift}deg)`

            this.minutes = parseInt((date.getMinutes()/60)*360);
            this.minutesObject.style.transform = `rotate(${this.minutes}deg)`

            this.seconds = parseInt((date.getSeconds()/60)*360);
            this.secondsObject.style.transform = `rotate(${this.seconds}deg)`
        }, 1000)
    }
}