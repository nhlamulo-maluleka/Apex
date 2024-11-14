public class ResponseMessage {
    @AuraEnabled
    public static String message {get; set;}
    @AuraEnabled
    public static Boolean sent {get; set;}
}