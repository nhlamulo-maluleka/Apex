global class GPTQueryController {
    //public static String baseURL = 'https://icy-helpful-thief.glitch.me';
    public class ResponseMessage {
        @AuraEnabled
        public String message {get; set;}
        @AuraEnabled
        public Boolean sent {get; set;}
    }
    
    @AuraEnabled
    public static GPTQueryController.ResponseMessage queryGPT(String message){
        GPTQueryController.ResponseMessage q = new GPTQueryController.ResponseMessage();
        q.message = message;
        q.sent = true;
            
        HttpRequest req = new HttpRequest();
        req.setHeader('Content-Type', 'application/json');
        req.setMethod('POST');
        req.setEndpoint('https://icy-helpful-thief.glitch.me/query');
        req.setBody(JSON.serialize(q));
        //req.setTimeout(1000);
        
        Http http = new Http();
        HttpResponse res = http.send(req);
       
        GPTQueryController.ResponseMessage gptResponse = (GPTQueryController.ResponseMessage)(JSON.deserialize(res.getBody(), GPTQueryController.ResponseMessage.class));
        
        return gptResponse;
    }
}