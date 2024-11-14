({
	startTimer : function(component, event, helper) {
        setTimeout(function timer(){
            component.set("v.counter", component.get("v.counter")+1);
            //setTimeout(timer, 1000);
        }, 1000);
	},
    sendMessage: function(component, event, helper){
        let messageObject = component.find("textMsg");
        
        let msglist = []
        let oldList = component.get("v.messages")
        
        for(let msg of oldList){
            msglist.push(msg)
        }
        
        helper.queryGPT(component, messageObject.get("v.value"), msglist);
        //console.log(messageObject.get("v.value"));
        messageObject.set("v.value", "");
    },
    searchOpportuniy: function(component, event, helper){
        let searchKey = component.find("searchField").get("v.value");
        helper.fetchOpportunities(component, searchKey);
    },
    loadMessages: function(component, event, helper){        
        component.set("v.messages", []);
    }
})