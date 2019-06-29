// contains a function that registers all the routes
// (installs handlers for paths in the server)
//  handles requests, and links them to the DB (which we access through the DAL [Data Access Layer]).

const DAL = require('./dal');

module.exports = {
    registerRoutes,
};

function registerRoutes(app) {
    // route for getting all the todos 
    app.get('/todos/:email', (req, res) => {
        const email = req.params.email;
        console.log('>> Routes: ' + email + ' GET');
        const todos = DAL.getTodos(email); // db access
        
        // send back the todos we read from the db
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(todos));
    });

    //route for adding a todo
    app.post('/todos/:email', (req, res) => {
        const email = req.params.email;
        const todoText = req.body;
        if(!todoText) {
            // if empty todo text
            res.status(403).send('Undefined todo text');
            return;
        }
        console.log('>> Routes: ' + email + ' ADD ' + todoText);
        const todo = DAL.addTodo(email, todoText); // db access
        
        // send back the newly added todo
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(todo));
    });

    // route for setting todo status (done/undone)
    app.post('/todos/:email/:id', (req, res) => {
        const email = req.params.email;
        const id = req.params.id;
        const status = req.body; // {done: bool}
        if(!status || !('done' in status)) {
            res.status(403).send('Please provide proper todo status');
            return;
        }
        DAL.markTodoAs(email, id, status.done);
        res.end('OK');
    });

    // route for delete a todo
    app.delete('/todos/:email/:id', (req,res) => {
        const email = req.params.email;
        const id = req.params.id;
        console.log('>> Routes: ' + email + ' DELETE ' + id);
        DAL.removeTodo(email, id); // db access
        res.end('OK');
    });
}