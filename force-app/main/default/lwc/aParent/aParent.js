import { LightningElement } from 'lwc';

export default class AParent extends LightningElement {

    searchTextParent;

    handleSearch(event){
        this.searchTextParent=event.detail;
        console.log('searchTextParent: ',this.searchTextParent)
    }

}