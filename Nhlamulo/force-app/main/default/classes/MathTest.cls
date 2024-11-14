@IsTest
public class MathTest { 
	@IsTest
    private static void testPositiveAddition(){
        Integer a = 5;
        Integer b = 5;
        Integer res = new Math().add(a, b);
        
        Assert.areEqual(10, res);
    }
    
    @IsTest
    private static void testNegativeAddition(){
        Integer a = -5;
        Integer b = -5;
        Integer res = new Math().add(a, b);
        
        Assert.areEqual(-10, res);
    }
    
    @IsTest
    private static void testPositiveDivision(){
        integer a = 20;
        integer b = 2;

        integer result = Math.div(a, b);
        
        Assert.areEqual(10, result);
        
    }
    
    @IsTest
    private static void testNegativeDivision(){
        integer a = 20;
        integer b = -2;

        integer result = Math.div(a, b);
        
        Assert.areEqual(-10, result);
    }
    
    /*@IsTest
    private static void testDivisionByZero(){
        integer a = 20;
        integer b = 0;
        Exception exp = null;

        try{
            integer result = Math.div(a, b);
        } catch(Exception e){
            exp = e;
        }
        
        if(exp != null){
            // Assert Error/Fail Condition
            Assert.isNotNull(exp);
            return;
        }
        // Assert
        Assert.isNull(exp);
    }*/
    
    @IsTest
    private static void testDivisionByZero(){
        Integer a = 20;
        Integer b = 0;

        try{
            Integer result = Math.div(a, b);
            Assert.fail('Division by zero errror');
        } catch(Exception e){}
    }
}