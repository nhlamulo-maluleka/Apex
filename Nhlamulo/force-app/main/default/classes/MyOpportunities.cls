global class MyOpportunities {
	@AuraEnabled
    public static List<Opportunity> searchOpportunity(String key){
        String searchKey = String.isBlank(key) ? '%%' : '%' + key + '%';
        
        List<Opportunity> opportunities = [SELECT 
                                          Id, 
                                          Name,
                                          CloseDate,
                                          Amount
                                          FROM Opportunity
                                          WHERE Name 
                                          LIKE :searchKey];
        System.debug(opportunities);
        return opportunities;
    }
}