import { FaEdit } from "react-icons/fa";
import {FaTrash} from "react-icons/fa";
import { MdCancel } from "react-icons/md";

import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { useState } from "react";

function Task({taskId = null, title = "Sample Task", description = "This is a sample task description", completed = false, fetchTodosOnDeleteTodo}) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [taskCompleted, setTaskCompleted] = useState(completed);

    function handleDelete() {
        fetch('http://localhost:8080/api/todos/' + taskId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                console.log("Task deleted successfully:", taskId);
                fetchTodosOnDeleteTodo();
            } else {
                console.error("Failed to delete task:", taskId);
            }
        })
        .catch(error => {
            console.error("Error deleting task:", taskId, error);
        });
    }

    function handleCompletedToggle() {
        // Logic for updating the task can be added here
        fetch('http://localhost:8080/api/todos/' + taskId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                completed: !taskCompleted
            })
        })
        .then(response => {
            if (response.ok) {
                console.log("Task updated successfully:", taskId);
                setTaskCompleted(!taskCompleted);
                if(!taskCompleted === true) {
                    setIsEditing(false);
                }
                fetchTodosOnDeleteTodo();
            } else {
                console.error("Failed to update task:", taskId);
            }
        })
        .catch(error => {
            console.error("Error updating task:", taskId, error);
        });
    }

    function handleEdit() {
        setIsEditing(prevIsEditing => !prevIsEditing);
    }

    function handleUpdate() {
        fetch('http://localhost:8080/api/todos/' + taskId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newTitle,
                description: newDescription,
                completed: taskCompleted
            })
        })
        .then(response => {
            if (response.ok) {
                console.log("Task updated successfully:", taskId);
                setIsEditing(false);
                fetchTodosOnDeleteTodo();
            } else {
                console.error("Failed to update task:", taskId);
            }
        })
        .catch(error => {
            console.error("Error updating task:", taskId, error);
        });
    }

    return <div className="flex flex-row justify-between gap-4 p-4 border border-gray-300 rounded shadow-sm">
       {
        isEditing && !taskCompleted? <div className="w-[80%]">
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="border border-gray-300 p-2 rounded w-full" />
            <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="border border-gray-300 p-2 rounded w-full" />
            <div className="flex justify-start gap-2 mt-2">
                <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded">Update</button>  
                <button onClick={handleEdit} className="bg-red-500 text-white p-2 rounded">Cancel</button>  
            </div>   
        </div>:<div className="w-[80%]">
            <h1 className={`text-2xl font-bold ${taskCompleted ? "line-through text-gray-500 decoration-black" : ""}`}>{title}</h1>
            <p className={`text-gray-600 text-1xl ${taskCompleted ? "line-through" : ""} break-words max-w-full`}>{description}</p>
        </div>
       }
        <div className="flex justify-between gap-2">
            {!isEditing && !taskCompleted ? <FaEdit size={20} onClick={handleEdit}/> : null}
            <FaTrash size={20} onClick={handleDelete} />
            {taskCompleted ? <IoIosCheckbox size={20} onClick={handleCompletedToggle}/> : <MdOutlineCheckBoxOutlineBlank size={20} onClick={handleCompletedToggle}/>}
        </div>
    </div>
}

export default Task;