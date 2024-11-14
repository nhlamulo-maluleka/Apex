// Primitive DT (Native programmming DTs) -> Integer, Double, Boolean, Decimal, String
// Abstract DT (Classes, Map, List, Set)
// 1 0 1 1 0 1 0
// object -> 1 0 0 0 1 1
// 
// Object -> Primitive
// sObject -> SF Object -> ADT

public with sharing class Classes101 {
    private String name; // Declaration -> Placeholder
    protected String name2 = 'Testing'; // Initialization
    
    
    // Object-Level
    // -> Can only be used through an object
    // -> Default behaviour of a class
    // Class-Level
    // -> Can only be used through the class that defined it
    // -> [Static]
    
    public Classes101(){}
    
    public Classes101(String n){
        System.debug(n);
    }

    // Inner class
    // -> A class inside another class
    public class Class2 {
        private Integer num;
        
        public Integer multiply(Integer n, Integer multiplier){
            System.debug(new Classes101().name2);
            return n * multiplier;
        }
    }
    
    // Methods/Functions -> (How) -> (Action Based)
    public void setName(){
        // Implement your task/method -> (How?)
        name = '';
    }
    
    public void setName(String n){
        name = n;
    }
    
    public String getName(){
        return name;
    }
    
	/*
	 * [Data Hiding] -> Encapsulation
	 * [Access Modifiers] -> (public, private, protected, global)
		 - attr
         - methods (Functions(normal), Constructors(special), Overloaded, Virtual)
	*/
}