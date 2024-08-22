public class Apex101 {        
    // -----------------------  Custom Labels  ------------------------------ //
    
    //application/json
    /*{
        'coures': 'name',
        'points': 50,
        'topics': [
            {...},
            {...},
        ]
    }*/
    // Map<String, Object> 
    
    
    class LabelItem {
        public String field;
        public String value;
    }
    
    class NRHLabels {
		public String labelName;
        public List<LabelItem> labels;
    }
    
    public static Map<String, String> getNRHLabel(String labelName){
        List<NRHLabels> labelsList = (List<NRHLabels>)JSON.deserialize(System.Label.nrhLabels, List<NRHLabels>.class);
        NRHLabels nrhLabel = null;
        Map<String, String> labelsMap = new Map<String, String>();
        
        for(NRHLabels label : labelsList){ 
            // If Statement must always return [true]
            if(label.labelName == labelName){
                nrhLabel = label;
                break;
            }
        }
        
        // If-Else
        // Switch
        // Tenary
        
        // Checking if the label exists
        if(nrhLabel == null) {
            return new Map<String, String>{'error' => 'Label: [' + labelName + '] does not exist'};
        }
        
        for(LabelItem item : nrhLabel.labels){ labelsMap.put(item.field, item.value); }
        return labelsMap;
    }
    
    public static void customLabelTest(String label){        
        Map<String, String> errorLabels = getNRHLabel(label);
        
        if(errorLabels.get('error') != null){
            System.debug(errorLabels.get('error'));
        }
        else {
            // Converting Set items to List
            List<String> v = new List<String>(errorLabels.keySet());
            Integer index = (Integer)Math.floor(Math.random() * v.size());
            
            switch on v[index] {
                when 'MANYPURPOSES', 'INVALIDSTARTDATE' {
                    System.debug('You found Diary Payment => ' + v[index]);
                }
                when else {
                    System.debug('Looks like you found nothing');
                }
            }
        }
    }
}