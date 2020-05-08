import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import TodoList from "./childComp/TodoList";
import TodoCompleted from "./childComp/TodoCompleted";
import AddTodoForm from "./childComp/AddTodoForm";

function TodoApp(props) {
  let {
    todoAppState,
    handleComplete,
    handleDelete,
    isLoading,
    addTodoUpdate,
  } = props;

  let { todoList } = todoAppState;

  return (
    <Container fluid>
      <Row>
        <Col>
          <AddTodoForm addTodoUpdate={addTodoUpdate} />
        </Col>
      </Row>
      <br />
      <Row>
        <Col className="col-md-6">
          <h4> Todo List</h4>
          <br />
          {isLoading ? (
            <Spinner animation="grow" />
          ) : (
            <TodoList
              todoData={todoList}
              handleDelete={handleDelete}
              handleComplete={handleComplete}
              addTodoUpdate={addTodoUpdate}
            />
          )}
        </Col>
        <Col className="col-md-6">
          <h4> Completed Todos</h4>
          <br />
          {isLoading ? (
            <Spinner animation="grow" />
          ) : (
            <TodoCompleted
              todoData={todoList}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
              addTodoUpdate={addTodoUpdate}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default TodoApp;
