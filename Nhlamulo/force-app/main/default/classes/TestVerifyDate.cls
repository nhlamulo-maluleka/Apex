@isTest
public class TestVerifyDate {
    @isTest static void testCheckDates(){
        Date date1 = Date.newInstance(2023, 3, 1);
        Date date2 = Date.newInstance(2023, 3, 31);
        System.assertEquals(date2, VerifyDate.CheckDates(date1, date2));
    }
    
    @isTest static void testCheckDatesWrong(){
        Date date1 = Date.newInstance(2023, 3, 1);
        Date date2 = Date.newInstance(2023, 3, 30);
        System.assertEquals(date2, VerifyDate.CheckDates(date1, date2));
    }
}