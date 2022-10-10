import { createContext, useState } from "react";

export const AppContext = createContext({});

export function AppContextProvider({children}) {
    const [auth, setAuth] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = (id,token,email,data) => {
    setAuth({id:id, token:token,email:email})
    setUserInfo({data:data})
    }
    const logout = () => {
        setAuth(null)
    }


    return (
        <AppContext.Provider value={{auth,login,logout,userInfo}}>
            {children}
        </AppContext.Provider>
    )


}