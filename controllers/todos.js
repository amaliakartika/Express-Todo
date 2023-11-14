const Todo = require('../models/todo');

exports.getTodos = (req, res, next) => {
    Todo.findAll({
        where: {
            deletedAt: null // Hanya ambil data yang belum dihapus
        }
    })
        .then(todos => {
            res.status(200).json({ todos });
        })
        .catch(err => console.log(err));
}


exports.getTodo = (req, res, next) => {
    const todoId = req.params.todoId;
    Todo.findByPk(todoId, {
        where: {
            deletedAt: null
        }
    })
        .then(todo => {
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found!' });
            }
            res.status(200).json({ todo });
        })
        .catch(err => console.log(err));
}

exports.createTodo = (req, res, next) => {
    const title = req.body.title;
    Todo.create({ title })
        .then(result => {
            console.log('Created Todo');
            res.status(201).json({
                message: 'Todo created successfully!',
                todo: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
}

exports.deleteTodo = (req, res, next) => {
    const todoId = req.params.todoId;
    Todo.findByPk(todoId)
        .then(todo => {
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found!' });
            }
            // Soft delete by setting deletedAt
            return todo.update({ deletedAt: new Date() });
        })
        .then(result => {
            res.status(200).json({ message: 'Todo deleted!' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
}
