public class StateHandler {
    @AuraEnabled
    public static String state {
        get;
        set;
    } 
    
    @AuraEnabled
    public static void setState(String s){
        state = s;
    }
}