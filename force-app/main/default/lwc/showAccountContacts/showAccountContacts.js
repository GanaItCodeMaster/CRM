import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import { LightningElement, api, wire } from 'lwc';
import SHOW_ACCOUNT_CHANNEL from '@salesforce/messageChannel/ShowAccount__c';
import getAccountContacts from '@salesforce/apex/AccountClass.getAccountContacts';
import LightningConfirm from 'lightning/confirm';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ShowAccountContacts extends LightningElement {

    accountId;
    accountName;
    title;
    contacts;
    hasContacts;
    isAccountSelected=false;
    isAddContactClicked=false;    
    isEditContactClicked = false;
    @api recordId;
    editableContactId;

    subscription=null;
    @wire(MessageContext) messageContext;
    
    connectedCallback(){
        this.handleSubscribe();
    }
    disconnectedCallback(){
        this.handleUnSubscribe();
    }

    handleSubscribe(){
        if(!this.subscription){
            this.subscription= subscribe(this.messageContext, SHOW_ACCOUNT_CHANNEL,
            (parameter) => {
                this.accountId=parameter.accountId;
                this.accountName = parameter.accountName;
                this.title = parameter.title + '\'s contacts ' ;
                this.getContacts();
            })
        }
    }


    async getContacts(){
        this.contacts = await getAccountContacts( {accountId: this.accountId});
        this.hasContacts = (this.contacts.length>0) ? true : false;
        this.isAccountSelected = true;
    }

    handleUnSubscribe(){
        unsubscribe(this.subscription);
        this.subscription=null;
    }

    handleAddNewContact(event){        
        this.isAddContactClicked=true;
    }

    handleAddNewContactClose(event){
        this.isAddContactClicked = false;
    }

    handleEditContact(event){        
        this.isEditContactClicked=true;

        /*For sending contact id from HTML to JS
        In HTML file: data-contact-id={contact.Id}
        In JS file, this.EditableContactId=event.target.dataset.contactId */
        this.editableContactId = event.target.dataset.contactId;
    }

    handleEditContactClose(event){
        this.isEditContactClicked = false;        
    }

    handleNewContactSaveSuccess(event){
        this.isAddContactClicked=false;
        this.getContacts();
        this.isEditContactClicked = false;
    }

    /* Add confirmation popup */
    async handleContactDelete(event){
        this.editableContactId = event.target.dataset.contactId;
        const result = await LightningConfirm.open({
            message: 'Are you sure, you want to delete this contact?',
            variant: 'headerless',
            label: 'this is the aria-label value',
            // setting theme would have no effect
        });

        console.log('Before checking result ', result, '', this.editableContactId);
        if(result){            
            
            let deleteResult = await deleteRecord(this.editableContactId);
            
            this.getContacts();            
            this.showToast();
        }
    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Get Help',
            message:
                'Contact is deleted',
        });
        this.dispatchEvent(event);
    }

}