const fs = require('fs');
// Đọc dữ liệu
async function readDB() {
    const data = await fs.readFileSync('./src/database/todoList.json');
    return JSON.parse(data);
}

// Ghi dữ liệu
async function writeDB(data) {
    await fs.writeFileSync('./src/database/todoList.json', JSON.stringify(data));
}
/**
 *
 * @returns {*}
 */
async function getAllTodoList() {
    return await readDB();
}

/**
 *
 * @param newTodo
 * @returns {{newTodo}}
 */
async function addTodo(newTodo) {
    const todoLists = await readDB();
    const length = todoLists.length;
    if (!length)
    {
        newTodo.id = 1;
    }else {
        const lastItem = todoLists[length - 1];
        newTodo.id = lastItem.id + 1;
    }


    const addTodo = [...todoLists, newTodo];
    todoLists.push(newTodo)
    await writeDB(addTodo)
    return {
        todoLists
    };
}


async function updateTodo(id, updatedData) {
    const todoLists = await getAllTodoList();
    const index = todoLists.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
        return {
            todoLists
        };
    }

    try {
        todoLists[index] = {...todoLists[index], ...updatedData};

        await writeDB(todoLists)

        return {
            todoLists
        };

    } catch (err) {
        return {
            todoLists
        };
    }
}

/**
 *
 * @param id
 * @returns {{message: string}}
 */
async function removeTodo(id) {
    const todoLists = await getAllTodoList();
    const index = todoLists.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
        return {
            message: 'Không tìm thấy sản phẩm để xóa'
        };
    }

    try {
        todoLists.splice(index, 1);
        await writeDB(todoLists)

        return {
            message: 'Xóa sản phẩm thành công'
        };

    } catch (err) {
        return {
            message: 'Có lỗi xảy ra khi xóa sản phẩm'
        };
    }
}

module.exports = {
    readDB,
    getAllTodoList,
    addTodo,
    updateTodo,
    removeTodo
};
