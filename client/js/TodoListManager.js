// expects:
// - DataService
// - TodoList

class TodoListManager {
    constructor(email, todos, container) {
        this.email = email;
        this.todos = todos;
        this.container = container;
        
        this.dataService = new DataService();
        
        this.onChange = this.onChange.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    
    addTodo(todoText) {
        this.dataService.addTodo(this.email, todoText)
            .then(todo => {
                this.todos.push(todo);
                this.render();
            });
    }
    
    onChange(id, done) {
        const changed = this.todos.find(todo => todo.id == id);
        if(!changed) return;
        
        this.dataService.markTodoAs(this.email, id, done)
            .then(res => {
                if(res.ok) {
                    // local change (after db was changed)
                    changed.done = done;
                    // re render after change
                    this.render();
                } else {
                    res.text().then(alert);
                }
            })
    }
    
    onDelete(id) {
        const deletedIndex = this.todos.findIndex(todo => todo.id == id);
        if(deletedIndex < 0) return;
        
        this.dataService.removeTodo(this.email, id)
            .then(() => {
                // local change (after db was changed)
                this.todos.splice(deletedIndex, 1);
                // re render after the delete
                this.render();
            })
    }
    
    render() {
        this.container.innerHTML = "";
        this.container.appendChild(TodoList({todos: this.todos, onChange: this.onChange, onDelete: this.onDelete}));
    }
}