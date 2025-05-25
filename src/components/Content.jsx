import CreateTask from "./CreateTask";
import ListTasks from "./ListTasks";
import { useState, useEffect } from "react";

function Content() {
    const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/todos");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTodos(data.reverse());
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  return <div className="max-w-[80%] m-auto">
      <CreateTask fetchTodosOnCreateTodo={fetchTodos} />
      <ListTasks todos={todos} fetchTodosOnDeleteTodo={fetchTodos} />
  </div>
}
    
export default Content;