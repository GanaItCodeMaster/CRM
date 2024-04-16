public with sharing class AccountClass {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(string searchedAccount){
        try {            
            if(String.isEmpty(searchedAccount)){
                return [SELECT Id, Name FROM Account];
            } else{
                searchedAccount = '%' + searchedAccount + '%';
                return [SELECT Id, Name FROM Account WHERE Name LIKE : searchedAccount];
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Contact> getAccountContacts(string accountId){
        try {
            return [SELECT Id, Name FROM Contact WHERE AccountId =: accountId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}