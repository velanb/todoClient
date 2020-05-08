import React, { Component } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import AlertsBar from "../../AlertMessages/AlertsBar";

class AddTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoName: null,
      todoDescription: null,
      showingAlert: false,
      alertType: null,
      alertMessage: null,
    };
  }
  uri = "http://localhost:4000/api/todo/addTodo";

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleAddTodo(event) {
    event.preventDefault();
    let { todoName, todoDescription } = this.state;
    let reqObject = {
      todoName: todoName,
      todoDescription: todoDescription,
    };
    axios.post(this.uri, reqObject).then((response) => {
      if (response.status === 201) {
        this.setState({
          todoName: "",
          todoDescription: "",
          showingAlert: true,
          alertType: "primary",
          alertMessage: response.data.message,
        });
        this.props.addTodoUpdate(response.data.data);
      } else {
        this.setState({
          showingAlert: true,
          alertType: "danger",
          alertMessage: response.data.message,
        });
      }
    });
    setTimeout(() => {
      this.setState({
        showingAlert: false,
      });
    }, 2000);
  }

  render() {
    return (
      <Container>
        <AlertsBar
          variant={this.state.alertType}
          message={this.state.alertMessage}
          show={this.state.showingAlert}
        />
        <Form>
          <Row>
            <Col className="col-md-2" style={{ "align-self": "center" }}>
              <br />
              <h4> Add todo -></h4>
            </Col>
            <Col className="col-md-4">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Todo Name</Form.Label>
                <Form.Control
                  name="todoName"
                  type="text"
                  placeholder="Enter Todo Name"
                  value={this.state.todoName}
                  onChange={this.handleInputChange.bind(this)}
                />
              </Form.Group>
            </Col>
            <Col className="col-md-5">
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Todo Description</Form.Label>
                <Form.Control
                  name="todoDescription"
                  as="textarea"
                  rows="1"
                  value={this.state.todoDescription}
                  onChange={this.handleInputChange.bind(this)}
                />
              </Form.Group>
            </Col>
            <Col className="col-md-1" style={{ "align-self": "center" }}>
              <Button variant="primary" onClick={this.handleAddTodo.bind(this)}>
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default AddTodoForm;
