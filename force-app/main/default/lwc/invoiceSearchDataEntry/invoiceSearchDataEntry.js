import { LightningElement } from 'lwc';

export default class InvoiceSearchDataEntry extends LightningElement {
    searchedText='';

    onSearchTextChanged(event){
        this.searchedText = event.target.value;        
    }

    onSearchClicked(event){        
        this.dispatchEvent(new CustomEvent('searchevent',{ 
            detail: this.searchedText
        }));
    }
}