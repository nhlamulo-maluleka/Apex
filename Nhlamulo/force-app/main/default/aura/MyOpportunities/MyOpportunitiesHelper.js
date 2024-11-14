({
	fetchOpportunities : function(component, searchKey) {
		component.set("v.columns", [
            {label: "ID", fieldName: "Id", type: "Text"},
            {label: "NAME", fieldName: "Name", type: "Text"},
            {label: "CLOSING_DATE", fieldName: "CloseDate", type: "Date"},
            {label: "AMOUNT", fieldName: "Amount", type: "Currency"}
        ]);
            
        let action = component.get("c.searchOpportunity");
            action.setParams({
            	"key": searchKey
            });
       
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state == "SUCCESS"){
                //debugger;
              component.set("v.opportunities", response.getReturnValue());
            } else {
                alert("Error while performing a lookup...");
            }
        });
        $A.enqueueAction(action);
	},
    queryGPT: function(component, message, msglist){
        
        msglist.push({
            message: message,
            sent: true
        });
        
        let action = component.get("c.queryGPT");
        action.setParams({
            "message": message
        });
        
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state == "SUCCESS"){
             	const resObject = response.getReturnValue();
                msglist.push({
                    message: resObject.message,
                    sent: resObject.sent
                })
            } else {
                console.log("An error occured!!");
            }
            
            component.set("v.messages", msglist);
        });
        
        $A.enqueueAction(action);
    }
})