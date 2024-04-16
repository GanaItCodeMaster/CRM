import { LightningElement } from 'lwc';

export default class SearchParentComponent extends LightningElement {

    searchParentText;

    handleSearch(event){
        this.searchParentText = event.detail;
        console.log('Inside handleSearch --> ', this.searchParentText);
    }

}