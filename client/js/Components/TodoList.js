// todolist assumes existance of todoitems.

function TodoList(props) {
    const {todos, onChange, onDelete} = props;
        
    // todos => todoItem
    const pending = [];
    const done = [];
    
    // split to done and undone
    todos.forEach(todo => {
        if(todo.done) {
            done.push(todo);
        }else {
            pending.push(todo);
        }
    });
    
    const container = document.createElement('div');
    container.classList.add('todolist');
    
    // map - from every todo object ({id: string, text: string, done: bool}) it creates DOM node of that todo item.
    // forEach - for each of that DOM nodes, we append it to the container.
    pending
        .map(todo => TodoItem({todo, onChange, onDelete}))
        .forEach(todoItem => container.appendChild(todoItem));
    
    // add a divider (the line between the pending and done todos);
    if(done.length > 0) {
        container.appendChild(Divider());
    }
    
    // same for the done items
    done
        .map(todo => TodoItem({todo, onChange}))
        .forEach(todoItem => container.appendChild(todoItem));
        
    return container;
}