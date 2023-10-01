import React from "react";
import "./App.css";

function Todo({ todo, index, completeTodo, removeTodo }) {
    return (
        <div
            className="todo"
            style={{ textDecoration: todo.status ? "line-through" : "" }}
        >
            {todo.title}
            <div>
                <button onClick={() => completeTodo(index)}>Complete</button>
                <button onClick={() => removeTodo(index)}>remove</button>
            </div>
        </div>
    );
}
export default Todo;