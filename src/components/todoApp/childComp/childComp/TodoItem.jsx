import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";

function TodoItem(props) {
  let { todoData, handleDelete, handleComplete, addTodoUpdate } = props;
  let { todoId, todoName, todoDescription, createdAt, isCompleted } = todoData;

  return (
    <Container fluid>
      <Card bg="light" style={{ width: "100%" }} text={"dark"}>
        <Card.Header>
          <Row>
            <Col className="col-md-10" style={{ "text-align": "left" }}>
              <h4>{todoName}</h4>
            </Col>
            <Col className="col-md-1">
              {isCompleted ? (
                <br />
              ) : (
                <button type="button">
                  <i
                    class="fas fa-check"
                    onClick={async (e) => {
                      await handleComplete(todoId);
                      await addTodoUpdate();
                    }}
                  ></i>
                </button>
              )}
            </Col>
            <Col className="col-md-1">
              <button type="button">
                <i
                  class="fas fa-times"
                  onClick={async (e) => {
                    await handleDelete(todoId);
                    await addTodoUpdate();
                  }}
                ></i>{" "}
              </button>{" "}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body style={{ "text-align": "start" }}>
          <Row>
            <Col className="col-md-10">
              <Row>
                <Col>Description:</Col>
              </Row>
              <Card.Text>{todoDescription}</Card.Text>
              <Card.Text>{createdAt}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <br />
    </Container>
  );
}

export default TodoItem;
