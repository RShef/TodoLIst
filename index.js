// entry point of the server.
// to run the server, we do 'node index.js' in the terminal.

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
app.use(express.static(__dirname));
app.get('/', (req,res,next) => {
    return res.sendFile('client/login.html', {root: __dirname});
});
app.use(express.static('client'));

// accept text and json types as body.
app.use(bodyParser.text());
app.use(bodyParser.json());

/*
// middleware to solve cors related problems.
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});*/

// register all the routes
routes.registerRoutes(app);

// start the server
app.listen(process.env.PORT, () => {
    console.log('server is running on port 3000');
});
