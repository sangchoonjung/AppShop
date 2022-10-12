import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

export function AppContextProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [zzimList, setZzimList] = useState([]);

    const [pendingList, setPendingList] = useState([]);

    const login = (id, token, email, data) => {
        setAuth({ id: id, token: token, email: email });
        setUserInfo({ data: data });
        setZzimList(data.zzimList);
        setPendingList(data.productPendingItem);
    }
    const logout = () => {
        setAuth(null);
        setUserInfo(null);
        setZzimList([]);
        setPendingList([]);
    }

    const setZzim = (list) => {
        setZzimList(list)
    }

    return (
        <AppContext.Provider value={{
            auth, login, logout, userInfo, zzimList, setZzim, pendingList, setPendingList
        }}>
            {children}
        </AppContext.Provider>
    )


}