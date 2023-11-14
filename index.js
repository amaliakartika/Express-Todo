const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./util/database');
const Todo = require('./models/todo');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// CORS handling
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use('/todos', require('./routes/todos'));

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(status).json({ message });
});

sequelize
    .sync()
    .then(result => {
        console.log('Database connected');
        app.listen(3000);
    })
    .catch(err => console.log(err));

module.exports = app;  // Export the app for testing
