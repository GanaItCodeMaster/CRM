import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import { LightningElement, api, wire } from 'lwc';
import SHOW_ACCOUNT_CHANNEL from '@salesforce/messageChannel/ShowAccount__c';
import getAccountContacts from '@salesforce/apex/AccountClass.getAccountContacts';
import LightningConfirm from 'lightning/confirm';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class CustomContactsComponent extends LightningElement {

    subscription=null;
    @wire(MessageContext) messageContext;
    accountId;
    accountName;
    title;
    contacts;
    hasContacts = false;

    connectedCallback(){
        this.handleSubscribe();
    }
    disconnectedCallback(){
        this.handleUnSubscribe();
    }    

    handleSubscribe(){
        if(!this.subscription){
            subscribe(this.messageContext,SHOW_ACCOUNT_CHANNEL,
            (parameter) => {
                this.accountId=parameter.accountId
                this.accountName = parameter.accountName
                this.title = parameter.title + '\'s contacts ';
                this.getContacts();
            });
        }

    }

    handleUnSubscribe(){
        unsubscribe(this.subscription);
        this.subscription=null;
    }

    async getContacts(){
        console.log('Inside getContacts');
        this.contacts = await getAccountContacts( {accountId: this.accountId});
        this.hasContacts= (this.contacts.length>0)?true:false;
        console.log('Inside getContacts1 --> ', this.contacts.length);
    }

    handleEditContact(event){

    }

    handleContactDelete(event){

    }
}
