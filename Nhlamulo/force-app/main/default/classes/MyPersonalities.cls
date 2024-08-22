public class MyPersonalities {
    public List<Personality__c> personalities;
    
    public List<Personality__c> getPersonalityList(){
        return this.personalities;
    }
    
    private void setPersonalityList(List<Personality__c> lst){
        this.personalities = lst;
    }
    
    public MyPersonalities(){
        //SOQL
        this.setPersonalityList([
            				SELECT Name, Personality_Type__c, Favourite_Food__c, Date_Created__c
                         	FROM Personality__c LIMIT 5
                        ]);
    }
}