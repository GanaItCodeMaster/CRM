import { LightningElement, api } from 'lwc';

export default class InvoiceSearchShowResults extends LightningElement {
    @api invoiceShowResultsText;

    columns=[
        {label:'Id', fieldName:'Id'},
        {label:'Name', fieldName:'Name'},
        {label:'Actions', fieldName:'Actions', type:'button', 
         typeAttributes:
            {
                label:'View Contacts',
                value:'view_contacts'
            }        
        }
    ];
}