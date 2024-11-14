public class ClientNotification {
    public static void sendSimpleEmail(List<String> toAddresses) {
        // Step 1: Create an instance of SingleEmailMessage
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        
        // Step 2: Set email properties
        email.setToAddresses(toAddresses);
        // email.setSubject('Test Email from Salesforce');
        // email.setPlainTextBody('Hello! This is a test email sent from an Apex class.');
        email.setTemplateId([SELECT Id FROM EmailTemplate WHERE DeveloperName = 'Nicroni_Services'].Id);
        email.setTargetObjectId([SELECT Id FROM Contact LIMIT 1].Id);
        
        // Optional: If you want to use HTML body instead of plain text
        // email.setHtmlBody('<h1>Hello!</h1><p>This is a test email sent from an Apex class.</p>');
        
        // Optional: Set additional email properties
        email.setSenderDisplayName('Nicroni Services');
        email.setReplyTo('donotreply@nicroni.com');
        
        // Step 3: Send the email
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
    }
}