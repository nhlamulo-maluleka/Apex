public with sharing class CheckUpdates {
    public static string url = 'https://quick-olive-governor.glitch.me';
    
    @AuraEnabled
    public static ILoadShedding fetchNextUpdate(integer block){
        try{
            HttpRequest req = new HttpRequest();
            req.setMethod('GET');
            req.setEndpoint('https://quick-olive-governor.glitch.me/next/' + block);

            HttpResponse res = new Http().send(req);

            System.debug(res.getBody());
            ILoadShedding next = (ILoadShedding)(JSON.deserialize(res.getBody(), ILoadShedding.class));
            return next;      
        } catch(Exception e){
            System.debug(e.getMessage());
            fetchNextUpdate(block);
        }
        return null;
    }
    
    @AuraEnabled
    public static List<ILoadShedding> fetchAllUpdates(integer block){
        try{
            HttpRequest req = new HttpRequest();
            req.setMethod('GET');
            req.setEndpoint(url + '/all/' + block);

            HttpResponse res = new Http().send(req);

            List<ILoadShedding> next = (List<ILoadShedding>)(JSON.deserialize(res.getBody(), List<ILoadShedding>.class));
            return next;      
        } catch(Exception e){
            System.debug(e.getMessage());
            fetchAllUpdates(block);
        }
        return null;
    }
}