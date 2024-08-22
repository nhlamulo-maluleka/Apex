public class FilmExtension {
    public Id filmId;
    
    public FilmExtension(ApexPages.StandardController std){
        filmId = std.getId();
    }
    
    public Film__c getMovie(){
        return null;
    }
}