import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => {
    const value = useContext(AuthContext);
    if (!value) throw new Error('useAuth must be wrapped inside AuthContextProvider') 
    return value
}

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    useEffect(() => {
        // onAuthStateChanged
        setTimeout(() => {
            setIsAuthenticated(true)
        }, 1000)
    }, [])

    const logIn = async (email, password) => {
        try {

        } catch (err) {

        }
    }

    const logOut = async () => {
        try {

        } catch (err) {

        }
    }

    const register = async (email, password, username) => {
        try {

        } catch (err) {

        }
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, logIn, logOut, register}}>
            {children}
        </AuthContext.Provider>
    )
}