class DataService {
    getTodos(email) {
        return new Promise(resolve => {
            fetch(`${config.serverAddr}/todos/${email}`)
                .then(res => res.json())
                .then(resolve);
        });
    }
    
    addTodo(email, todoText) {
        return new Promise((resolve, reject) => {
            fetch(`${config.serverAddr}/todos/${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: todoText
            }).then(res => {
                if(res.ok) {
                    res.json().then(resolve);
                }else {
                    res.text().then(reject);
                }
            });
        });
    }

    markTodoAs(email, id, done) {
        return fetch(`${config.serverAddr}/todos/${email}/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({done}),
        });
    }

    removeTodo(email, id) {
        return fetch(`${config.serverAddr}/todos/${email}/${id}`, {method: 'DELETE'});
    }
}