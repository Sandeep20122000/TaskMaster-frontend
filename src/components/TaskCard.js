import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { useTaskContext } from '../hooks/useTaskContext';

const TaskCard = ({ task }) => {

  const {dispatch} = useTaskContext()

  const handleDeleteTask = async () => {
    
    const response = await fetch('/api/tasks/' + task._id, {
      method: 'DELETE'
    })

    const json = await response.json()

    if(response.ok) {
      dispatch({type: 'DELETE_TASK', payload: json})
    }
  }

  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  }
  return (
    <div className="bg-gray-900 relative h-30 rounded-md my-10 p-4 text-white shadow-xl">
      <h2 className="text-xl font-bold mb-2">{task.title}</h2>
      <div className="mb-2">
        <span className={`inline-block px-2 py-1 text-sm font-semibold rounded ${
          task.priority === 'High' ? 'bg-red-500 text-white' : task.priority === 'Medium' ? 'bg-yellow-500 text-gray-800' : 'bg-green-500 text-white'
        }`}>
          {task.priority}
        </span>
        <span className={`inline-block ml-2 px-2 py-1 text-sm font-semibold rounded ${
          task.status === 'Todo' ? 'bg-red-500 text-white' : task.status === 'In Progress' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
        }`}>
          {task.status}
        </span>
      </div>
      {task.description && <p className="text-white mb-2">{task.description}</p>}
      {task.dueDate && <p className="text-white mb-2">Due Date: {Intl.DateTimeFormat("en-US", dateOptions).format(new Date(task.dueDate))}</p>}
      <button
        className="absolute top-2 right-10 text-white hover:text-yellow-500"
        onClick={() => handleDeleteTask(task._id)}
      >
        <FontAwesomeIcon icon={faSave} />
      </button>
      <button
        className="absolute top-2 right-2 text-white hover:text-red-500"
        onClick={() => handleDeleteTask(task._id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default TaskCard;
