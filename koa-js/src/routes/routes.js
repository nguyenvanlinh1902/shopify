const Router = require('koa-router');
const productHandler = require('../handlers/product/productHandlers.js')
const todoHandler = require('../handlers/todo/todoHandlers.js')
const validate = require('../middleware/productInputMiddleware')
// Prefix all routes with /books
const router = new Router({
    prefix: '/api'
});

router.get('/products', productHandler.getProducts);
router.post('/products',validate, productHandler.saveProducts);
router.put('/product/:id', productHandler.changeProduct);
router.delete('/product/:id', productHandler.deleteProduct);
router.get('/product/:id', productHandler.getProduct);

//todolist
router.get('/todos', todoHandler.getTodos);
router.post('/todo', todoHandler.addTodoList);
router.put('/todo/:id', todoHandler.updateTodolist);
router.delete('/todo/:id', todoHandler.removeTodolist);

module.exports = router;
