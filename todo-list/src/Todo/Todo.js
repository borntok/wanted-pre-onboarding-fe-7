import { useState } from "react";
import axios from "axios";

import Divider from "./Divier";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function Todo() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  function handleTextChange(text) {
    setText(text);
  }

  async function createTodo() {
    let data = JSON.stringify({
      todo: text,
    });
    const response = await axios.post("/todos", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    console.log(response);
  }

  async function getTodos() {
    const response = await axios.get("/todos", {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });

    const newTodos = response.data;
    console.log(newTodos);
    setTodos(newTodos);
  }

  async function handleSubmit() {
    createTodo();
    getTodos();
    setText("");
  }

  return (
    <main>
      <TodoInput
        text={text}
        onTextChange={handleTextChange}
        onSubmit={handleSubmit}
      />
      <Divider />
      <TodoList todos={todos} />
    </main>
  );
}
