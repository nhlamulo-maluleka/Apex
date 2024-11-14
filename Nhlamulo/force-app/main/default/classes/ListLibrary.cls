public class ListLibrary {
	Integer[] intList;
    Integer Size = 0;
    
    public ListLibrary(){
        this.intList = new Integer[Size];
    }
    
    public void push(Integer value){
        this.Size = this.Size + 1;
        Integer[] tempList = new Integer[Size];
        
        //Copying the previous array
        for(Integer i = 0; i < this.Size-1; i++){
            tempList[i] = this.intList[i];
        }
        
        tempList[this.Size-1] = value;
        
        this.intList = tempList;
    }
    
    public void pop(){
        this.Size = this.Size - 1;
        Integer[] temp = new Integer[this.Size];
        for(Integer p = 0; p < this.Size; p++){
            temp[p] = this.intList[p];
        }
        this.intList = temp;
    }
    
    public void showList(){
        for(Integer item : this.intList){
            System.debug(item);
        }
    }
}