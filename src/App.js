import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/static/AppNavbar";
import TodoApp from "./components/todoApp/TodoApp";
import Alert from "./components/AlertMessages/AlertsBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navBarState: {
        appName: "Todo-App",
      },
      todoAppState: {
        todoList: [],
      },
      isLoading: true,
      alert: {
        alertType: "",
        alertMessage: "",
        showAlert: false,
      },
    };
  }

  componentWillMount() {
    this.fetchItems();
  }

  fetchItems() {
    axios
      .get(`${process.env.BACKEND_URL}/api/todo/getTodos`)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            todoAppState: {
              todoList: response.data.data,
            },
          });
        }
      })
      .catch((Err) => {
        console.log(Err);
      });
  }

  addTodoUpdate() {
    this.fetchItems();
  }

  componentDidUpdate(prevProps) {
    if (this.state.isLoading) {
      this.setState({
        isLoading: false,
      });
    }
  }

  handleDeleteButton(id) {
    axios
      .delete(`${process.env.BACKEND_URL}/api/todo/deleteTodo/${id}`)
      .then((response) => {
        if (response.status === 201) {
          let objIndex = this.state.todoAppState.todoList.findIndex(
            (obj) => obj.todoId === id
          );
          let tempArr = this.state.todoAppState.todoList;
          tempArr[objIndex] = response.data.data;

          this.setState({
            todoAppState: {
              todoList: tempArr,
            },
            alert: {
              alertType: "danger",
              alertMessage: response.data.message,
              showAlert: true,
            },
          });
        }
      })
      .then(() => {
        setTimeout(() => {
          this.setState({
            alert: {
              alertType: "",
              alertMessage: "",
              showAlert: false,
            },
          });
        }, 2000);
      });
  }

  handleCompleteButton(id) {
    let updateObj = {
      isCompleted: true,
    };
    axios
      .put(`${process.env.BACKEND_URL}/api/todo/updateTodo/${id}`, updateObj)
      .then((response) => {
        if (response.status === 201) {
          let objIndex = this.state.todoAppState.todoList.findIndex(
            (obj) => obj.todoId === id
          );
          let tempArr = this.state.todoAppState.todoList;
          tempArr[objIndex] = response.data.data;

          this.setState({
            todoAppState: {
              todoList: tempArr,
            },
            alert: {
              alertType: "warning",
              alertMessage: response.data.message,
              showAlert: true,
            },
          });
        }
      })
      .then(() => {
        setTimeout(() => {
          this.setState({
            alert: {
              alertType: "",
              alertMessage: "",
              showAlert: false,
            },
          });
        }, 2000);
      });
  }

  render() {
    let { navBarState, todoAppState, alert, isLoading } = this.state;
    let { alertMessage, alertType, showAlert } = alert;
    return (
      <div className="App">
        <Navbar navBarState={navBarState} />
        <Alert variant={alertType} message={alertMessage} show={showAlert} />
        <TodoApp
          todoAppState={todoAppState}
          isLoading={isLoading}
          handleComplete={this.handleCompleteButton.bind(this)}
          handleDelete={this.handleDeleteButton.bind(this)}
          addTodoUpdate={this.addTodoUpdate.bind(this)}
        />
      </div>
    );
  }
}

export default App;
