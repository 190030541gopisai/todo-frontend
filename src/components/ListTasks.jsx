import { useState, useEffect } from "react";
import Task from "./Task";


function ListTasks({todos, fetchTodosOnDeleteTodo}) {
  
  return <>
    <h1 className="text-2xl font-bold mb-4">Tasks</h1>
    {todos.map((task) => (
      <Task key={task.id} taskId={task.id} title={task.title} description={task.description} completed={task.completed} fetchTodosOnDeleteTodo={fetchTodosOnDeleteTodo} />
    ))}
    {
      todos.length === 0 && <p className="text-gray-500">No tasks available</p>
    }
  </>
}

export default ListTasks;