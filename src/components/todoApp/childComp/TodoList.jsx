import React from "react";
import { Container } from "react-bootstrap";
import TodoItem from "./childComp/TodoItem";

function TodoList(props) {
  let { todoData, handleDelete, handleComplete, addTodoUpdate } = props;
  let list = [];
  todoData.forEach((todo) => {
    if (!todo.isCompleted) list.unshift(todo);
  });
  return (
    <Container style={{ height: "600px", "overflow-y": "scroll" }}>
      {list.length === 0 ? (
        <h5>No Todos Available</h5>
      ) : (
        list.map((data, idx) => (
          <TodoItem
            todoData={data}
            key={idx}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
            addTodoUpdate={addTodoUpdate}
          />
        ))
      )}
    </Container>
  );
}

export default TodoList;
