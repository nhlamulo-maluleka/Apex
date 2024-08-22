public class CalculatorController {
    public String num;
    
    public void setDigit(String n) {
        this.num = n;
    }
    
    public String getResult(){
        return this.num;
    }
    
    public CalculatorController(){}
}