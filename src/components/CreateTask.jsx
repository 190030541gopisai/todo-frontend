import { useState } from "react";

function CreateTask({ fetchTodosOnCreateTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodo = () => {
    if(!title) {
      alert("Title is required");
      return;
    }
    try{
      const newTodo = { title, description, completed: false };
      fetch("http://localhost:8080/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }).then((data) => {
        console.log("Todo added successfully:", data);
        alert("Todo added successfully!");
        fetchTodosOnCreateTodo();
      }).catch((error) => {
        console.error("Error adding todo:", error);
        alert("Failed to add todo. Please try again.");
      });
    } catch (error) {
      console.error("Failed to add todo:", error);
      alert("Failed to add todo. Please try again.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex justify-between items-center mb-4 gap-1">
        <div className="w-full">
            <label htmlFor="todo-title" className="block font-medium">Title</label>
            <input
            id="todo-title"
            type="text"
            name="todo-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            />
        </div>

        <div className="w-full">
            <label htmlFor="todo-description" className="block font-medium">Description</label>
            <input
            id="todo-description"
            type="text"
            name="todo-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            />
        </div>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
}

export default CreateTask;
