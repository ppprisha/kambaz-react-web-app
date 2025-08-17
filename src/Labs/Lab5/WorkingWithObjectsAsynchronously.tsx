import React, { useState, useEffect } from "react";
import * as client from "./client";
import { FormControl, ListGroup } from "react-bootstrap";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";

export default function WorkingWithArraysAsynchronously() {
    const [todos, setTodos] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchTodos = async () => {
        try {
            const data = await client.fetchTodos();
            setTodos(data);
        } catch (error: any) {
            setErrorMessage("Failed to fetch todos");
        }
    };

    const createTodo = async () => {
        try {
            const updated = await client.createTodo();
            setTodos(updated);
        } catch (error: any) {
            setErrorMessage("Failed to create todo");
        }
    };

    const postTodo = async () => {
        try {
            const newTodo = await client.postTodo({ title: "New Posted Todo", completed: false });
            setTodos([...todos, newTodo]);
        } catch (error: any) {
            setErrorMessage("Failed to post todo");
        }
    };

    const editTodo = (todo: any) => {
        setTodos(todos.map(t => (t.id === todo.id ? { ...todo, editing: true } : t)));
    };

    const updateTodo = async (todo: any) => {
        try {
            await client.updateTodo(todo);
            setTodos(todos.map(t => (t.id === todo.id ? { ...todo, editing: false } : t)));
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Failed to update todo");
        }
    };

    const removeTodo = async (todo: any) => {
        try {
            const updated = await client.removeTodo(todo);
            setTodos(updated);
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Failed to remove todo");
        }
    };

    const deleteTodo = async (todo: any) => {
        try {
            await client.deleteTodo(todo);
            setTodos(todos.filter(t => t.id !== todo.id));
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Failed to delete todo");
        }
    };

    useEffect(() => { fetchTodos(); }, []);

    return (
        <div>
            <h3>
                Todos
                <FaPlusCircle className="text-success float-end fs-3" onClick={createTodo} />
                <FaPlusCircle onClick={postTodo} className="text-primary float-end fs-3 me-3" />
            </h3>

            {/* Show error messages */}
            {errorMessage && (
                <div className="alert alert-danger mb-2 mt-2" id="wd-todo-error-message">
                    {errorMessage}
                </div>
            )}

            <ListGroup>
                {todos.map(todo => (
                    <ListGroup.Item key={todo.id}>
                        <FaPencil
                            onClick={() => editTodo(todo)}
                            className="text-primary float-end me-2 mt-1"
                        />
                        <FaTrash
                            onClick={() => removeTodo(todo)}
                            className="text-danger float-end mt-1"
                        />
                        <TiDelete
                            onClick={() => deleteTodo(todo)}
                            className="text-danger float-end me-2 fs-3"
                        />

                        <input
                            type="checkbox"
                            className="form-check-input me-2 float-start"
                            defaultChecked={todo.completed}
                            onChange={e => updateTodo({ ...todo, completed: e.target.checked })}
                        />

                        {!todo.editing ? (
                            <span>{todo.title}</span>
                        ) : (
                            <FormControl
                                className="w-50 float-start"
                                defaultValue={todo.title}
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        updateTodo({ ...todo, editing: false });
                                    }
                                }}
                                onChange={e => updateTodo({ ...todo, title: e.target.value })}
                            />
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}
