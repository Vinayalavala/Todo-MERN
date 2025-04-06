import { useEffect, useState } from "react";
import Create from "./Create.jsx";
import axios from "axios";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    fetch("http://localhost:4000/get")
      .then((result) => result.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDel = (id) => {
    axios
      .delete("http://localhost:4000/delete/" + id)
      .then(() => fetchTodos())
      .catch((error) => console.log(error));
  };

  const handleEdit = (id) => {
    const newTask = prompt("Enter new task");
    if (!newTask?.trim()) {
      alert("Please enter a valid task");
      return;
    }

    axios
      .put("http://localhost:4000/update/" + id, { task: newTask })
      .then(() => fetchTodos())
      .catch((error) => console.log(error));
  };

  const handleComp = (id) => {
    axios
      .put("http://localhost:4000/update/" + id, { completed: true })
      .then(() => fetchTodos())
      .catch((error) => console.log(error));
  };

  const handleUncomp = (id) => {
    axios
      .put("http://localhost:4000/update/" + id, { completed: false })
      .then(() => fetchTodos())
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
          Todo List
        </h1>

        <Create />

        <div className="space-y-4">
          {todos.length === 0 ? (
            <p className="text-center text-gray-600">No tasks available</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <h2
                  className={`text-lg font-medium ${
                    todo.completed ? "line-through text-green-600" : "text-gray-800"
                  }`}
                >
                  {todo.task}
                </h2>

                <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
                  <button
                    onClick={() => handleDel(todo._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(todo._id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  {!todo.completed ? (
                    <button
                      onClick={() => handleComp(todo._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                    >
                      Complete
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUncomp(todo._id)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md"
                    >
                      Uncomplete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
