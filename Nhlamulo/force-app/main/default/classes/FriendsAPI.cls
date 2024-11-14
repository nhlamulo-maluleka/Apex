@isTest
public class FriendsAPI {
	@isTest
    public static void getFriendsTest(){
        StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
        mock.setStaticResource('FriendsAPI');
        mock.setStatusCode(200);
        mock.setHeader('Content-Type', 'application/json');
        
        Test.setMock(HttpCalloutMock.class, mock);
        
        //Test.startTest();        
    }
}