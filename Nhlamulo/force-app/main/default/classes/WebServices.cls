public class WebServices {
    private static string url = 'https://icy-helpful-thief.glitch.me';
    
    public class FoodItem {
        public String name;
        public Decimal price;
    }
    
    public static List<FoodItem> getFoods(){
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint(url + '/foods');
        req.setTimeout(8000);
        
        Http http = new Http();
        HttpResponse res = http.send(req);
        
        List<FoodItem> items = (List<FoodItem>)(JSON.deserialize(res.getBody(), List<FoodItem>.class));
        
        return items;
    }
    
    public static void printItems(){
        for(FoodItem item : getFoods()){
            System.debug(item.name);
        }
    }
    
    public static void sendMessage(FoodItem item){
        HttpRequest req = new HttpRequest();
        
        req.setMethod('POST');
        req.setEndpoint(url + '/add');
        req.setHeader('X-Auth-Token', 'Geeks4Learning');
        req.setHeader('Content-Type', 'application/json');
        req.setBody(JSON.serialize(item));
        
        Http http = new Http();
        HttpResponse res = http.send(req);
        System.debug(res.getBody());
    }
}