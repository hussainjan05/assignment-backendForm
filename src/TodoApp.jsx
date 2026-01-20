import { useState } from "react";
import "./App.css";

function TodoApp() {
  const [task, setTask] = useState("");      // input value
  const [todos, setTodos] = useState([]);    // todo list
  const [editId, setEditId] = useState(null); // edit mode

  // ADD & UPDATE
  const handleAdd = () => {
    if (task === "") return;

    if (editId !== null) {
      // UPDATE
      const updatedTodos = todos.map((todo) =>
        todo.id === editId ? { ...todo, text: task } : todo
      );
      setTodos(updatedTodos);
      setEditId(null);
    } else {
      // CREATE
      setTodos([...todos, { id: Date.now(), text: task }]);
    }

    setTask("");
  };

  // DELETE
  const handleDelete = (id) => {
    const filtered = todos.filter((todo) => todo.id !== id);
    setTodos(filtered);
  };

  // EDIT
  const handleEdit = (todo) => {
    setTask(todo.text);
    setEditId(todo.id);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Todo App (CRUD)</h2>

      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={handleAdd}>
        {editId ? "Update" : "Add"}
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
