public class PersonalityController {
    public String userName {get; set;}
    public String value1 {get; set;}
    
    public PersonalityController(){
        this.userName = 'Silas';
    }
    
    public void changeName(){
        this.userName = this.value1;
    }
}