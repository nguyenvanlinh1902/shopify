const {getAllTodoList: getAllTodoList,
    readDB:readDB,
    addTodo: addTodo,
    updateTodo: updateTodo,
    removeTodo: removeTodo
    } = require("../../database/todoRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getTodos(ctx) {
    try {
        const data = await readDB();
        ctx.body = {
            data
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}
async function addTodoList(ctx) {
    try {
        const postData = ctx.request.body;
        postData.status  = 0;
        const newTodo = await addTodo(postData);

        ctx.body = {
             newTodo
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}
async function updateTodolist(ctx) {
    try {
        const postData = ctx.request.body;
        const {id} = ctx.params;
        const data = await updateTodo(id,postData);

        ctx.body = {
            data
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}
async function removeTodolist(ctx) {
    try {
        const {id} = ctx.params;
        console.log(id)
        const message = removeTodo(id);

        ctx.body = {
            message: message
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

module.exports = {
    getTodos,
    addTodoList,
    updateTodolist,
    removeTodolist
};