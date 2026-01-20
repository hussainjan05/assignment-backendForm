const express = require("express");
const cors = require("cors");
const { LocalStorage } = require("node-localstorage");

const app = express();
const localStorage = new LocalStorage("./storage");

app.use(cors());
app.use(express.json());

const getTodos = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// post /todos - Create a new todo

app.post("/todos", (req, res) => {
  const todos = getTodos();
  const newTodo = {
    id: Date.now(),
    text: req.body.text,
  };

  todos.push(newTodo);
  saveTodos(todos);

  res.status(201).json(newTodo);
});


// get 
app.get("/todos", (req, res) => {
  res.json(getTodos());
});


// put

app.put("/todos/:id", (req, res) => {
  let todos = getTodos();
  const id = Number(req.params.id);

  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, text: req.body.text } : todo
  );

  saveTodos(todos);
  res.json({ message: "Todo updated" });
});

// delete

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todos = getTodos().filter((todo) => todo.id !== id);

  saveTodos(todos);
  res.json({ message: "Todo deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
