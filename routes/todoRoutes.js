const express = require('express')
const router = express.Router();
const {getTodos, createTodo, updateTodo, deleteTodo, getTodo} = require('../controllers/todoControllers')
const validateToken = require('../middleware/validateToken')

router.use(validateToken);

//chainable route handler for a specific path, allows us to define multiple HTTP method
router.route('/').get(getTodos).post(createTodo)

router.route('/:id').put(updateTodo).delete(deleteTodo).get(getTodo)


module.exports = router; 