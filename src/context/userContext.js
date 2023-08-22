import React, { createContext, useReducer } from 'react'

export const userContext = createContext()

const userReducer = (state, action) => {

    switch (action.type) {
        case 'SET_USER':

            return {
                user: action.payload
            }
        case 'ADD_TASK':
            return {
                user: {
                    ...state,
                    tasks: [...state.user.tasks, action.payload]
                }
            }
        default:
            return state
    }

}

export const UserContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(userReducer, {
        user: JSON.parse(localStorage.getItem('currentUser')) || null 
    })

    return (
        <userContext.Provider value={{state, dispatch}}>
            {children}
        </userContext.Provider>
    ) 
}