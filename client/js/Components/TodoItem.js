
function TodoItem(props) {
    const { todo, onChange, onDelete } = props;
    
    const todoItem = document.createElement('div');
    todoItem.classList.add('todoItem');
    
    // create and configure the textbox
    const checkBox = document.createElement('input');
    checkBox.classList.add('todoItemCheckbox');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.checked = todo.done;
    checkBox.addEventListener('click', (event) => {
       // on click - call onChange
        onChange(todo.id, event.target.checked);
    });
    
    // create the todo text
    const todoText = document.createElement('div');
    todoText.classList.add('todoItemText');
    if(todo.done) todoText.classList.add('todoItemDone');
    todoText.innerText = todo.text;
    
    // create and configure the delete button
    const deleteBox = document.createElement('button');
    deleteBox.classList.add('todoItemDelete');
    deleteBox.innerHTML = 'X';
    deleteBox.onclick = () => {
        // notify parent about delete
        onDelete(todo.id);
    };
    
    // add all the elements to the main container (todoItem)
    todoItem.appendChild(deleteBox);
    todoItem.appendChild(checkBox);
    todoItem.appendChild(todoText);
    
    return todoItem;
    
    // -------------------------------------
    // [ ] blah blah blah                 X
    // -------------------------------------
}