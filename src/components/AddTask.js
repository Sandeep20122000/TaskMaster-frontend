import React, { useState } from 'react';
import { useTaskContext } from '../hooks/useTaskContext';
import { useUserContext } from '../hooks/useUserContext';
import { createTask } from '../API/tasksAPI';
import { updateUser } from '../API/usersAPI';

const AddTaskForm = () => {

  const {dispatch: taskDispatch} = useTaskContext()
  const {dispatch: userDispatch} = useUserContext()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Todo')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    const newTask = {
        title,
        description,
        dueDate,
        priority,
        status,
        createdBy: currentUser._id
    };

    console.log('payload', newTask)
    
    const response = await createTask(newTask)

    const json = await response.json()

    console.log("created task", json)
    if (!response.ok) {
        setError(json.error)
        alert("Failed to create  task", error)
    }
    if(response.ok) {
        setTitle('')
        setDescription('')
        setDueDate('')
        setPriority('')
        setStatus('')
        setError(null)
        taskDispatch({type: 'CREATE_TASK', payload: json})

        const payload = {
          userId: currentUser._id,
          key: 'tasks',
          value: json._id
        }
        const userResponse = await updateUser(payload)

        if (userResponse.ok){
          userDispatch({type: 'ADD_TASK', payload: json._id})
        } else {
          throw Error('Unable to add task to user')
        }
        
    }

  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-gray-900 shadow-md rounded text-gray-300">
      <div className="mb-4">
        <label htmlFor="title" className="block font-bold mb-2">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-gray-200 text-gray-600 w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-bold mb-2">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-200 text-gray-600 w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="dueDate" className="block font-bold mb-2">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          required
          onChange={(e) => setDueDate(e.target.value)}
          className="bg-gray-200 text-gray-600 w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="priority" className="block font-bold mb-2">Priority:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-gray-200 text-gray-600 w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block font-bold mb-2">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-gray-200 text-gray-600 w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
