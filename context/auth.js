import { createContext, useState } from "react";

export const AppContext = createContext({});

export function AppContextProvider({children}) {
    const [auth, setAuth] = useState(null);

    const login = (id,token) => {
    setAuth({id:id, token:token})
    }
    const logout = () => {
        setAuth(null)
    }


    return (
        <AppContext.Provider value={{auth,login,logout}}>
            {children}
        </AppContext.Provider>
    )


}