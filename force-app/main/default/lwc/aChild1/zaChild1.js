import { LightningElement } from 'lwc';

export default class AChild1 extends LightningElement {

    searchValue='';

    handleTextChange(event){
        this.searchValue=event.target.value;
        console.log('Search Value: ', this.searchValue);
    }
    handleSearchClick(event){
        console.log('Inside onSearchClick');        
        this.dispatchEvent(new CustomEvent('searchevent',{ 
            detail: this.searchValue
        }));
    }
}