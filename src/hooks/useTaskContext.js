import { taskContext } from "../context/taskContext";
import { useContext } from "react";

export const useTaskContext = () => {

    const context = useContext(taskContext)

    if (!context) {
        throw Error('useTaskContext must be used under taskContextProvider')
    }

    return context
}