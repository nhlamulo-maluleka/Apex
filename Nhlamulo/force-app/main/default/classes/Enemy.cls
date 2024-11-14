public without sharing class Enemy {
    public Enemy(string n, Integer h, Integer d) {
        this.name = n;
        this.health = h;
        this.damage = d;
    }

    @AuraEnabled public string name { get; set; }
    @AuraEnabled public integer health { get; set;}
    @AuraEnabled public integer damage { get; set; }
}