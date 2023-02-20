const bodyParser = require('body-parser');
const { data } = require('jquery');
const mongoose = require('mongoose');

//connect to the database
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://dinaks:99ATO1t9sdXBMO4y0xHY@15.206.7.200:28017/dinaks?authMechanism=DEFAULT&authSource=admin');

//create a schema - this is like blueprint
const todoSchema = new mongoose.Schema({
    item: String
});

const Todo = mongoose.model('todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// const data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding'}];

module.exports = (app) => {

    app.get('/todo', (req, res) => {
        // get data from mongodb and pass it to view
        Todo.find({}, (err, data) => {
            if (err) throw err;
            res.render('todo', { todos: data });
        });

    });

    app.post('/todo', urlencodedParser, (req, res) => {
        // get data from the view and add it to mongodb
        const newTodo = Todo(req.body).save((err, data) => {
            if (err) throw err;
            res.json(data);
            console.log(data);
        });
    });

    app.delete('/todo/:item', (req, res) => {
        Todo.find({
            item: req.params.item.replace(/\-/g, " ")
        }).remove((err, data) => {
            if (err) throw err;
            res.json(data);
        });

    });

};