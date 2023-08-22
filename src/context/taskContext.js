import React, { createContext, useReducer } from 'react'

export const taskContext = createContext()

export const taskReducer = (state, action) => {

    console.log('state', state)
    switch (action.type) {
        case 'SET_TASKS':
            return {
                tasks: action.payload
            }
        case 'CREATE_TASK':
            console.log(action.payload, state)
            if(state.tasks != null) {
                return {tasks: [action.payload, ...state.tasks]}
                
            } else {
                return {tasks: [action.payload]}
            }
        case 'DELETE_TASK':
            return {
                tasks: state.tasks.filter((task) => task._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const TasksContextsProvider = ({children}) => {

    const [state, dispatch] = useReducer(taskReducer, {
        tasks: null
    })

    return (
        <taskContext.Provider value={{...state, dispatch}}>
            {children}
        </taskContext.Provider>
    )
}