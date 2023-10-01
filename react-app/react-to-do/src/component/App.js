import React, {useEffect, useState} from "react";
import "./App.css";
import Todo from "./todo";
import TodoForm from "./todoForm";
import useFetchApi from '../hooks/useFetchApi'
import axios from 'axios';
import {cleanup} from "@testing-library/react";

function App() {
    const API_URL = 'http://localhost:5000/api';
    const {data: todosData, loading, fetched} = useFetchApi({
        url: 'http://localhost:5000/api/todos'
    });
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        setTodos(todosData.data)
    }, []);
    const addTodo = async (text) => {
        const newTodo = {
            title: text
        };
        try {
            const updatedTodos = await axios.post(`${API_URL}/todo`, newTodo);
            setTodos(updatedTodos.data.newTodo.todoLists);
        } catch (err) {
            console.error(err);
        }

    };
    const completeTodo = async (index) => {
        try {
            const newTodos = [...todos].filter(todo => todo.id === index);
            newTodos[0].status = 1;
            const dataTodos = await axios.put(`${API_URL}/todo/${index}`,newTodos[0]);
            setTodos(dataTodos.data.data.todoLists);

        } catch (error) {
            console.log(error);
        }

    };

    const removeTodo = async (id) => {
        try {
            await axios.delete(`${API_URL}/todo/${id}`);
            const newTodos = [...todos].filter(todo => todo.id !== id);
            setTodos(newTodos);

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <ul>
            {loading && todos ? (
                <div>
                    Loading users......
                </div>
            ) : (
                <React.Fragment>
                    <div className="app">
                        <div className="todo-list">
                            <div>{JSON.stringify(todos)}</div>
                            {todos && todos.map(todo => {
                                return (
                                    <Todo
                                        key={todo.id}
                                        index={todo.id}
                                        todo={todo}
                                        completeTodo={completeTodo}
                                        removeTodo={removeTodo}
                                    />
                                )
                            })}
                            <TodoForm addTodo={addTodo}/>
                        </div>
                    </div>
                </React.Fragment>
            )
            }
            {fetched && (<div>
                Done Fetching
            </div>)
            }
        </ul>
    );
}

export default App;