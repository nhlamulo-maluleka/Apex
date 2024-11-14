public class Loops {
    public static void loops(){
        // For
        // While
        // Do-While
        // ----------
        // ForEach
        // 
        
        List<Integer> numbers = new List<Integer>{1, 2, 4, 5, 23, 89, 127, 933};
        System.debug('For Loop');
        for(Integer i = 0; i < numbers.size(); i++){
            if(numbers[i] == 89){
            	break;
            }
            
            if(numbers[i] == 2 || numbers[i] == 5){
            	continue;
            }
            
            System.debug(numbers[i]);
        }
        
        /*System.debug('ForEach Loop');
        for(Integer n : numbers){
            System.debug(n);
        }
        System.debug('ForEach sObject Loop');
        for(sObject n : [SELECT Id, Name FROM Account LIMIT 10]){
            System.debug(((Account)n).Name);
        }*/
        
        /*Integer index = 5;
        while(true){
            // Code...
            index +=4;
            //break;
            //return;
            //continue;
        }
        
        do {
            //Do something...
        } while(true);*/
    }
}