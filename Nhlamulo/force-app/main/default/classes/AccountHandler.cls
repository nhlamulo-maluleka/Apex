// Derived (Child)
public class AccountHandler extends UserUtils {  
    public void test(){
        System.debug(name);
    }
    
    public override User getCurrentUser(){
        User us = [SELECT Id, Username FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1];
        return us;
    }
    
    /*public void viewMyAccounts(){
        List<Account> myAccounts = [SELECT Id, Name, Active__c FROM Account WHERE OwnerId = :getCurrentUser().Id ORDER BY CreatedDate DESC];
        System.debug(myAccounts.size() + ' => ' + getActiveAccounts(myAccounts).size());
        System.debug(getActiveAccounts(myAccounts));
    }
    
    private List<Account> getActiveAccounts(List<Account> acc){
        List<Account> activeAcc = new List<Account>();
        
        for(Account a : acc){
            if(a.Active__c == 'Yes'){
                activeAcc.add(a);
            }
        }
        
        return activeAcc;
    }
*/
}