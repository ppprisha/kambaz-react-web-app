import React, { useState } from "react";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithArrays() {
    const API = `${REMOTE_SERVER}/lab5/todos`;

    const [todo, setTodo] = useState({
        id: "1",
        title: "Task 1",
        completed: false,
        description: "Task 1 description",
    });

    return (
        <div id="wd-working-with-arrays">
            <h3>Working with Arrays</h3>

            <h4>Retrieve All</h4>
            <a className="btn btn-primary" href={API}>Get Todos</a>

            <h4>Retrieve by ID</h4>
            <input type="text" value={todo.id} onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
            <a className="btn btn-primary" href={`${API}/${todo.id}`}>Get Todo by ID</a>

            <h4>Filter Completed</h4>
            <a className="btn btn-primary" href={`${API}?completed=true`}>Get Completed Todos</a>

            <h4>Create</h4>
            <a className="btn btn-success" href={`${API}/create`}>Create Todo</a>

            <h4>Delete</h4>
            <a className="btn btn-danger" href={`${API}/${todo.id}/delete`}>Delete Todo ID={todo.id}</a>

            <h4>Update Title</h4>
            <input type="text" value={todo.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
            <a className="btn btn-primary" href={`${API}/${todo.id}/title/${todo.title}`}>Update Title</a>

            <h4>Update Description</h4>
            <input type="text" value={todo.description} onChange={(e) => setTodo({ ...todo, description: e.target.value })} />
            <a className="btn btn-primary" href={`${API}/${todo.id}/description/${todo.description}`}>Update Description</a>

            <h4>Update Completed</h4>
            <input type="checkbox" checked={todo.completed} onChange={(e) => setTodo({ ...todo, completed: e.target.checked })} />
            <a className="btn btn-primary" href={`${API}/${todo.id}/completed/${todo.completed}`}>Update Completed</a>
        </div>
    );
}