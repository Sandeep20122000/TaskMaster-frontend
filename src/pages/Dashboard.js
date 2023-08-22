import React from 'react'
import Navbar from '../components/Navbar'
import AddTask from '../components/AddTask'
import TaskContainer from '../components/tasksContainer'

const Dashboard = () => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    return(
        <div className='h-screen flex justify-between bg-gray-600'>
            <Navbar profile={currentUser} />
            <div className='w-3/5 p-5 overflow-y-scroll scrollbar-none'>
                <TaskContainer />
            </div>
            <div className='bg-gray-900 h-100 w-1/4 px-5 m-2 rounded-md '>
                <AddTask />
            </div>
        </div>
    )
}

export default Dashboard