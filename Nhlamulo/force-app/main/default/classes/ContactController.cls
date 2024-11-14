public with sharing class ContactController {
    @AuraEnabled
    public static List<Contact> getAllContacts(){
        return [SELECT Id, FirstName, LastName, Email FROM Contact LIMIT 20];
    }
}