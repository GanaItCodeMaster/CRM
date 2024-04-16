import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import SHOW_ACCOUNT_CHANNEL from '@salesforce/messageChannel/ShowAccount__c';

export default class AShowResults extends LightningElement {

    accountId;
    accountName;
    subscription=null;
    @wire(MessageContext) messageContext;

    connectedCallback(){
        this.handleSubscribe();
    }
    disconnectedCallback(){
        this.handleUnsubscribe();
    }
    handleSubscribe(){
        if(!this.subscription){
            this.subscription = subscribe(this.messageContext,SHOW_ACCOUNT_CHANNEL,
                (parameter)=> {
                    this.accountId=parameter.accountId
                    this.accountName=parameter.accountName
                    this.title = parameter.title + '\'s contacts ' ;
                });
        }
    }

    handleUnsubscribe(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }

}