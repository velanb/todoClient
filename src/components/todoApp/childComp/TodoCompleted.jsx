import React from "react";
import { Container } from "react-bootstrap";
import TodoItem from "./childComp/TodoItem";

function TodoCompleted(props) {
  let { todoData, addTodoUpdate, handleDelete } = props;
  let list = [];
  todoData.forEach((todo) => {
    if (todo.isCompleted) list.unshift(todo);
  });
  return (
    <Container style={{ height: "600px", "overflow-y": "scroll" }}>
      {list.length === 0 ? (
        <h5>No Completed Todos</h5>
      ) : (
        list.map((data, idx) => (
          <TodoItem
            todoData={data}
            key={idx}
            addTodoUpdate={addTodoUpdate}
            handleDelete={handleDelete}
          />
        ))
      )}
    </Container>
  );
}

export default TodoCompleted;
