({
	playVideo : function(component, event, helper) {
		var inputObject = component.find("vidId");
        var videoId = inputObject.get("v.value");
        
        if(videoId.length > 0){
        	component.set("v.videoUrl", `https://www.youtube.com/embed/${videoId}`);
			component.set("v.display", true);                          
        }else {
            component.set("v.display", false);                          
        }
	}
})