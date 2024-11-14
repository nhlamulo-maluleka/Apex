// Base Class (Parent)
public virtual class UserUtils {
    protected String name = 'test name';
    
    public virtual User getCurrentUser(){
        return null;
    }
    
    public virtual User getUserDetails(List<String> fields, Id userId){
        String query = 'SELECT ' + String.join(fields, ', ') + ' FROM User WHERE Id = :userId';
        User u = Database.query(query);
        return u;
    }
}

// Base/Super -> Root Class
// GrandParent
// Parent
// Child
// -----------------------------------------------
// Class Relationships
// Aggregation 
// Composition
// Inheritance (Single/[Multiple]/Hierarchical)
// Association
// Dependancy