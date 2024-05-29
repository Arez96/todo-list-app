import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  addTodo = (todo, deadline) => {
    const newTodo = {
      id: Date.now(),
      text: todo,
      completed: false,
      deadline: deadline,
    };
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    });
  };

  render() {
    return (
      <div className="App">
        <img
          src={`${process.env.PUBLIC_URL}/todo-liste-logo.png`}
          alt="Todo List Logo"
          style={{ width: "100px", height: "auto" }}
        />
        <h1>My Todo List</h1>
        <TodoList
          todos={this.state.todos}
          deleteTodo={this.deleteTodo}
          toggleComplete={this.toggleComplete}
        />
        <AddTodoForm addTodo={this.addTodo} />
      </div>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text} - {todo.deadline}
            </span>
            <div>
              <button onClick={() => this.props.toggleComplete(todo.id)}>
                Done
              </button>
              <button onClick={() => this.props.deleteTodo(todo.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

class AddTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "", deadline: "" };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.input.trim()) {
      this.props.addTodo(this.state.input, this.state.deadline);
      this.setState({ input: "", deadline: "" });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="input"
          placeholder="Add a new todo..."
          value={this.state.input}
          onChange={this.handleChange}
        />
        <input
          type="date"
          name="deadline"
          value={this.state.deadline}
          onChange={this.handleChange}
        />
        <button type="submit">Add Todo</button>
      </form>
    );
  }
}

export default App;
