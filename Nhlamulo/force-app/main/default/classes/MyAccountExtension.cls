public class MyAccountExtension {
	private final Account acc;
    public String recordId {get; set;}
    
    public MyAccountExtension(ApexPages.StandardController stdctr){
        acc = (Account)stdctr.getRecord();
        this.recordId = '0018d00000PvrYmAAJ';
    }
    
    public String getAccountInfo(){
        return 'Account Name: ' + acc.Name;
    }
}