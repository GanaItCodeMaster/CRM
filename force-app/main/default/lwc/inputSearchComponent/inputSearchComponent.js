import { LightningElement } from 'lwc';

export default class InputSearchComponent extends LightningElement {
    searchText='';

    onTextChanged(event){
        this.searchText = event.target.value;
    }

    onSearchClicked(event){
        this.dispatchEvent(new CustomEvent('searchevent',{
            detail: this.searchText
        }));
    }
}