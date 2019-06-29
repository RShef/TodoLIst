const uuid = require('uuid/v4');

class DAL {
    constructor() {
        this.db = {};
    }
    
    getTodos(email) {
        // if this.db[email] is undefined (no entry), it will return empty array
        return this.db[email] || [];
    }
    
    addTodo(email, todoText) {
        // register email if not registered yet
        if(!(email in this.db)) {
            this.db[email] = [];
        }
        
        const todo = {
            id: uuid(),
            text: todoText,
            done: false,
        };
        this.db[email].push(todo);
        return todo;
    }
    
    markTodoAs(email, todoId, done) {
        const todos = this.db[email];
        if(!todos) return false;
        
        const todo = todos.find(item => item.id == todoId);
        if(!todo) return false;
        
        todo.done = done;
        return true;
    }
    
    // returns true if successfully removed, false otehrwise
    removeTodo(email, todoId) {
        if(email in this.db) {
            const todolist = this.db[email];
            for(let i=0;i<todolist.length;++i) {
                if(todoId == todolist[i].id) {
                    todolist.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }
}

module.exports = new DAL();