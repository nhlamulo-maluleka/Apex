public without sharing class ILoadShedding {
    public ILoadShedding(string dt, string tm, string st, string bl){
        this.dates = dt;
        this.times = tm;
        this.stage = st;
        this.blocks = bl;
    }

    @AuraEnabled public string dates { get; set; }
    @AuraEnabled public string times { get; set; }
    @AuraEnabled public string stage { get; set; }
    @AuraEnabled public string blocks { get; set; }
}