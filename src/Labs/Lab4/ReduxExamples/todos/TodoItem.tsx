import React from "react";
import { useDispatch } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: any }) {
  const dispatch = useDispatch();

  return (
    <ListGroup.Item key={todo.id}>
      <Button
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
        variant="danger"
        className="me-2"
      >
        Delete
      </Button>
      <Button
        onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click"
        variant="warning"
        className="me-2"
      >
        Edit
      </Button>
      {todo.title}
    </ListGroup.Item>
  );
}
