trigger EnemyTrigger on Enemy__c (before insert) {
    if(Trigger.isBefore){
        if(Trigger.isInsert){
            for(Enemy__c e : Trigger.new){
                if(e.Health__c > 50){
                    e.Is_Boss_Level__c = true;
                }
                // e.addError('Error creating an enemy');
                // System.debug();
            }
        }
    }
}