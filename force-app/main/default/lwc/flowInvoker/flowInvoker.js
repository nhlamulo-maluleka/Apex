import LightningModal from 'lightning/modal';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { api, wire } from 'lwc';
import STAGE_FIELD from "@salesforce/schema/Opportunity.StageName";
import LOSS_FIELD from "@salesforce/schema/Opportunity.Loss_Reason__c";
import LossReasonModal from 'c/lossReasonModal';

export default class FlowInvoker extends LightningModal {
    @api recordId;
    showDialog = false;

    async openLossReasonModal(){
        const ls = await LossReasonModal.open()
        console.log(ls)
    }

    connectedCallback(){
        this.openLossReasonModal()
    }

    get flowInputVariables() {
        return [
            {
                name: 'record',
                type: 'String',
                value: this.recordId
            }
        ];
    }

    @wire(getRecord, { 
        recordId: "$recordId",
        fields: [STAGE_FIELD, LOSS_FIELD]
     })
     wiredOpportunity;

    get isClosedLost(){
        return getFieldValue(this.wiredOpportunity.data, STAGE_FIELD) === 'Closed Lost' 
            && !getFieldValue(this.wiredOpportunity.data, LOSS_FIELD)
    }
}