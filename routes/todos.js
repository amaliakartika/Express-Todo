const controller = require('../controllers/todos');
const router = require('express').Router();

router.get('/', controller.getTodos);
router.get('/:todoId', controller.getTodo);
router.post('/', controller.createTodo);
router.delete('/:todoId', controller.deleteTodo);

module.exports = router;