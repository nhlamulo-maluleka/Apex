public without sharing class LeadAssignment {
	public static Integer snum = 0;
    public Integer onum = 0;
    
    public void objectLevel(){
        System.debug(onum);
    }
    
    public static void classLevel(){
        System.debug(snum);
    }
}
// Relationships -> (Communication/Interaction)
// OOP Principles (Inhr/Inter/Abtracts)