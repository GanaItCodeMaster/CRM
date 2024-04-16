import { LightningElement } from 'lwc';

export default class AccountParent extends LightningElement {
    searchTextParent;

    handleSearch(event){
        console.log('Inside AccountParent handleSearch');
        this.searchTextParent = event.detail;
        console.log('searchTextParent value: ', this.searchTextParent);
    }

}