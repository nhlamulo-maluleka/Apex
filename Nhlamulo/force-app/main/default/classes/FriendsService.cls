public class FriendsService {
	private static string baseUrl = 'https://icy-helpful-thief.glitch.me';
    
    public static List<Friend.FriendList> getFriends(){
        HttpRequest req = new HttpRequest();
        req.setHeader('Content-Type', 'application/json');
        req.setMethod('POST');
        req.setEndpoint(baseUrl+'/friends');
        
        Http http = new Http();
        HttpResponse res = http.send(req);
        
        List<Friend.FriendList> data = (List<Friend.FriendList>)(JSON.deserialize(res.getBody(), List<Friend.FriendList>.class));
        
        return data;
    }
}