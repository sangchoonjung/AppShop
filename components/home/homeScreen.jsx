import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { AppContext } from "../../context/auth";
import { requestAllProduct } from "../../util/product";
import MainHeader from "../mainheader";
import Header from "../mainheader";
import Category from "./category";
import List from "./list";
import SearchBar from "./searchBar";

function HomeScreen() {


    const [itemList,setItemList] = useState(null);
    const [filter,setFilter] = useState([])
    //리스트에서 필터링(안되면 바꿀게요)


    useEffect(() => {
        requestAllProduct().then(p => {
            setItemList(p.message);
            //서버에서 받아온 아이템으로 변경해야됨
        })
    }, []);

    const ctx = useContext(AppContext);
    
    return (
        <View>
            <MainHeader />
            <Text>환영합니다 ! {ctx.auth?ctx.auth.id:""} 님</Text>
            <SearchBar filter={filter} setFilter={setFilter}/>
            <Category filter={filter} setFilter={setFilter}/>
            <List  item={itemList} filter={filter}/>
        </View>
    );
}

export default HomeScreen;