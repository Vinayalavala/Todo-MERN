import { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) {
      alert("Please enter a task");
      return;
    }

    axios
      .post("http://localhost:4000/add", { task })
      .then(() => {
        location.reload(); // Refresh the page to show the new todo
        setTask(""); // Clear input after adding
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      <input
        type="text"
        name="todoinput"
        placeholder="Enter a todo"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full sm:w-auto flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={handleAdd}
        className="bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
      >
        Add
      </button>
    </div>
  );
}

export default Create;
