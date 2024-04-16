import { LightningElement, wire } from 'lwc';
import getRecords from '@salesforce/apex/csvProcessController.getRecords'

export default class CsvProcess extends LightningElement {

    columns=[
        {label:'Id', fieldName:'Id'},
        {label:'Name', fieldName:'Name'},
        {label:'Industry', fieldName:'Industry', type:'text'},
        {label:'Phone', fieldName:'Phone', type:'phone'},        
    ];
    accountData=[];
    
    /*@wire(getRecords) wiredFunctions;*/
    @wire(getRecords) wiredFunctions({data,error}){
        if(data){
            this.accountData = data;
        }else if(error){
            console.log(error);
        }
    }

    handleRowAction(event){

    }
    handleBtnExportToExcel(event){
        let selectedRows=[];
        let downloadedRows=[];
        selectedRows = this.template.
                        querySelector('lightning-datatable').
                        getSelectedRows();
        if(selectedRows.length>0){
            downloadedRows=[...selectedRows];
        }else
            downloadedRows = [...this.accountData];

        /* Export to CSV */
        let csvFile = this.convertArrayToCSV(downloadedRows);
        this.createDownloadLink(csvFile);
    }
    convertArrayToCSV(rows){
        let header=Object.keys(rows[0]).toString();
        let body=rows.map((item) => 
        Object.values(item).toString());
        let csvFile = header + '\n' + body.join('\n');
        return csvFile;
    }
    createDownloadLink(csvFile){
        const link = document.createElement('a');
        link.href='data:text/csv;charset=utf-8,' + encodeURI(csvFile);
        link.target='_blank';
        link.download='Account_Data.csv';
        link.click();
    }

    get checkRecord(){        
        this.accountData.length>0?false:true;
    }
}