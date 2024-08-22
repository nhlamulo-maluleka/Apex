public with sharing class EagleShooter {
    @AuraEnabled(cacheable=true)
    public static List<Enemy> getEnemies(){
        List<Enemy> enemies = new List<Enemy>();
        List<Enemy__c> elist = [SELECT Name, Health__c, Damage__c FROM Enemy__c];

        for(Enemy__c e : elist){
            enemies.add(new Enemy(e.Name, (Integer)e.Health__c, (Integer)e.Damage__c));
        }

        return enemies;
    }
}