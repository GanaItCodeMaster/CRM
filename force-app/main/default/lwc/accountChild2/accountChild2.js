import { LightningElement, api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountClass.getAccounts';
import { MessageContext, publish } from 'lightning/messageService';
import SHOW_ACCOUNT_CHANNEL from '@salesforce/messageChannel/ShowAccount__c';

export default class AccountChild2 extends LightningElement {
    @api searchTextChild2;
    currentId;
    currentName;
    /* Syntax for parameters: ApexClass parameter name, $ValueVariable */
    @wire(getAccounts, { searchedAccount:'$searchTextChild2'} ) accountRecords;
    @wire(MessageContext) messageContext;

    columns=[
        {label:'Id', fieldName:'Id'},
        {label:'Name', fieldName:'Name'},
        {label:'Actions', fieldName:'Actions', type:'button', typeAttributes:
        {
            label:'View Contacts',
            value:'view_contacts'
        }
        }       
    ];

    rows=[
        {Id:21, Name:'Kalyan'},
        {Id:31, Name:'Anusha'},
        {Id:41, Name:'Raghu'},
        {Id:51, Name:'Lakshmi'},
        {Id:61, Name:'Babji'},
        {Id:71, Name:'Narasimha Rao'},
        {Id:81, Name:'Atta'},
    ];

    handleRowAction(event){

        //console.log('Child2 Event: ', JSON.parse(event.detail));
        if(event.detail.action.value=='view_contacts'){
            this.currentId=event.detail.row.Id;
            this.currentName=event.detail.row.Name;

            const payload = {
                accountId:event.detail.row.Id,
                accountName: event.detail.row.Name,
                title:event.detail.row.Name
            }

            publish(this.messageContext, SHOW_ACCOUNT_CHANNEL ,payload);
        }
    }
}