const express = require('express');
const todoController = require('./controllers/todoController');

const app = express();

//set the template engine
app.set('view engine','ejs');

//static files
app.use(express.static('styles'));
app.use(express.static('node_modules'));

//fire controllers
todoController(app);

//listen to port
app.listen(3000);

console.log('you are listening to port 3000');