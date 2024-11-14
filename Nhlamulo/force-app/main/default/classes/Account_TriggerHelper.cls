public with sharing class Account_TriggerHelper {
    public static void beforeInsert(List<Account> toInsert){
    	System.debug(toInsert);    
    }
    
    public static void affterUpdate(List<Account> updated){
        System.debug(updated);
    }
}