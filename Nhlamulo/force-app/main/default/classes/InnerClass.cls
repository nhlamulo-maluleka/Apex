public class InnerClass {
    public class Motor{
        public String engineType;
        
        public Motor(String etype){
            this.engineType = etype;
        }
        
        public void showEType(){
            System.debug(this.engineType);
        }
    }
    
    public void printText(){
        System.debug('Hello there....');
    }
}