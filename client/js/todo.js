// define timer for logout
const loginService = new LoginService();

if(loginService.isLogged()) {
    // auto logout
    setAutoLogout(5);
    const email = loginService.email;
    
    document.getElementById("title").innerText = 'Hello, ' + extractName(email) + ' !';
    
    const listContainer = document.getElementById('list-container');
    const dataService = new DataService();
    dataService.getTodos(email).then((todos) => {
        console.log(todos);
        const todoListManager = new TodoListManager(email, todos, listContainer);
        todoListManager.render();
        
        // hook up the form
        const addForm = document.getElementById('add-form');
        addForm.onsubmit = (e) => {
            e.preventDefault();
            const todoText = new FormData(addForm).get('todo');
            todoListManager.addTodo(todoText);
            addForm.reset();
            return false;
        }
    });
    
} else {
    onLogout();
}

function setAutoLogout(minutes) {
    setTimeout(() => {
        loginService.logout();
        onLogout();
    }, minutes * 60 * 1000);
}

function onLogout() {
    window.location.replace('login.html');
}

function extractName(email) {
    // TODO extract the name
    return email;
}