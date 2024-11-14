public class ChildRelation {
    public static List<String> multipleContacts(){
        List<String> multiAcc = new List<String>();
        List<Account> accounts = [SELECT Name, (SELECT Id, Name, Email FROM Contacts) FROM Account];
        
        for(Account acc : accounts){
            if(acc.Contacts.size() > 1){
                multiAcc.add(acc.Name);
            }
        }
        
        return multiAcc;
    }
    
    public static List<List<Account>> searchAccounts(String key){
        List<List<Account>> foundList = [FIND :key IN ALL FIELDS RETURNING Account(Id, Name, Site)];
        return foundList;
    }
}