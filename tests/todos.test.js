const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../util/database');
const Todo = require('../models/todo');

describe('Todo API', () => {
    // Run migrations before starting the tests
    beforeAll(async () => {
        await sequelize.sync();
    });

    // Clear the database after each test
    afterEach(async () => {
        await Todo.destroy({ where: {} });
    });

    it('should get all todos', async () => {
        // Create a test todo
        await Todo.create({ title: 'Test Todo' });

        const res = await request(app).get('/todos');
        expect(res.status).toBe(200);
        expect(res.body.todos).toHaveLength(1);
        // Add more assertions as needed
    });

    it('should get a specific todo', async () => {
        // Create a test todo
        const createdTodo = await Todo.create({ title: 'Test Todo' });

        const res = await request(app).get(`/todos/${createdTodo.id}`);
        expect(res.status).toBe(200);
        expect(res.body.todo.title).toBe('Test Todo');
        // Add more assertions as needed
    });

    it('should create a new todo', async () => {
        const res = await request(app)
            .post('/todos')
            .send({ title: 'New Todo' });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Todo created successfully!');
        expect(res.body.todo.title).toBe('New Todo');
        // Add more assertions as needed
    });

    it('should soft delete a todo', async () => {
        // Create a test todo
        const createdTodo = await Todo.create({ title: 'Test Todo' });

        const res = await request(app).delete(`/todos/${createdTodo.id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Todo deleted!');

        // Check if the todo is soft deleted
        const deletedTodo = await Todo.findByPk(createdTodo.id, { paranoid: false });
        expect(deletedTodo.deletedAt).toBeTruthy();
        // Add more assertions as needed
    });
});


