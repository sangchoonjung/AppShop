import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

export function AppContextProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [zzimList, setZzimList] = useState([]);

    const [pendingList, setPendingList] = useState([]);
    const [completeList, setCompleteList] = useState([]);

    const [completeReview,setCompleteReview]=useState([])


    const login = (id, token, email, data) => {
        setAuth({ id: id, token: token, email: email });
        setUserInfo({ data: data });
        setZzimList(data.zzimList);
        setPendingList(data.productPendingItem);
        setCompleteList(data.productCompleteItem);
        setCompleteReview(data.completeReview)
    }
    const logout = () => {
        setAuth(null);
        setUserInfo(null);
        setZzimList([]);
        setPendingList([]);
        setCompleteList([]);
        setCompleteReview([]);
    }

    const setZzim = (list) => {
        setZzimList(list)
    }

    const setCompleteReviewList =(response)=>{
        
        setCompleteReview(response);

    }
    return (
        <AppContext.Provider value={{
            auth, login, logout, userInfo, zzimList, setZzim, pendingList, setPendingList
            , completeList, setCompleteList,completeReview,setCompleteReviewList
        }}>
            {children}
        </AppContext.Provider>
    )


}