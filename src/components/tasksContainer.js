import React, { useEffect } from 'react'
import TaskCard from './TaskCard'
import { useTaskContext } from '../hooks/useTaskContext'

const TaskContainer = () => {

    const {tasks, dispatch} = useTaskContext()
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    dispatch({type: ''})

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks/getTasks/'+ currentUser._id)
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_TASKS', payload: json})
            }
        }

        fetchTasks()
    }, [currentUser._id, dispatch]) 

    return (
        <div>
            {tasks && tasks.map((task) => (<TaskCard task={task} />))}
        </div>
    )
}

export default TaskContainer