global class ChatGPTService {
	private static string baseUrl = 'https://icy-helpful-thief.glitch.me';
    
    public class Statement{
        @InvocableVariable
        public string input;
    }
    
    @InvocableMethod(label='Ask GPT' description='Provides an interface for querying chatGPT Api')
    public static List<String> askGPT(List<Statement> st){
        try{
            HttpRequest req = new HttpRequest();
            req.setMethod('POST');
            req.setEndpoint(baseUrl + '/apexAsk');
            req.setHeader('Content-Type', 'application/json');
            req.setTimeout(60000);
            req.setBody(JSON.serialize(st[0]));
            
            Http http = new Http();
            HttpResponse res = http.send(req);
            
            List<String> response = new List<String>();
            response.add(res.getBody());
            
            return response;
        } catch(Exception e){
            //Will this violate the Govenor Limits?
            return askGPT(st);
        }
    }
    
    
}