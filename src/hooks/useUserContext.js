import { useContext } from "react";
import { userContext } from "../context/userContext";

export const useUserContext = () => {
    const context = useContext(userContext)

    if (!context) {
        throw Error('useUserContext must be used under userContextProvider')
    }

    return context
}