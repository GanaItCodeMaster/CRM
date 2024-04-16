public with sharing class csvProcessController {
    public csvProcessController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getRecords(){
        try {
            return [SELECT Id, Name, Industry, Phone FROM Account];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}