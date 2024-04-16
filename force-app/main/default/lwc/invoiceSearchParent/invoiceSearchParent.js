import { LightningElement } from 'lwc';

export default class InvoiceSearchParent extends LightningElement {
    searchInvoiceText;

    handleParentSearch(event){        
        console.log('Inside InvoiceParent handleSearch');
        this.searchInvoiceText = event.detail;
        console.log('handleParentSearch value: ', this.searchInvoiceText);
    }
}