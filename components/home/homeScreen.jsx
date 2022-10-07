import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { AppContext } from "../../context/auth";
import { categoryFilteredProduct, requestAllProduct, searchFilteredProduct } from "../../util/product";

import MainHeader from "../mainheader";
import Header from "../mainheader";
import Category from "./category";
import List from "./list";
import SearchBar from "./searchBar";

function HomeScreen() {
    const [itemList, setItemList] = useState(null);
    const [filter, setFilter] = useState([])
    useEffect(() => {
        requestAllProduct().then(p => {
            setItemList(p.message);
        }).catch(e => console.log(e.message));
    }, []);
    useEffect(() => {
        categoryFilteredProduct(filter).then(p => setItemList(p?.message));
        if (filter.length === 0) {
            //필터 제거하면 전체목록
            //모든 값 제거했을 때(빈 필터) 약간의 로딩 딜레이 있음(나중에 스피너)
            requestAllProduct().then(p => {
                setItemList(p.message);
            }).catch(e => console.log(e.message));
        }
    }, [filter]);
    const ctx = useContext(AppContext);

    const searchHandle = (keyword)=>{
        console.log(keyword)
        searchFilteredProduct(keyword).then(e=>setItemList(e.message))
    }




    return (
        <View>
            <MainHeader />
            <Text>환영합니다 ! {ctx.auth ? ctx.auth.id+"님" : ""} </Text>
            <SearchBar searchHandle={searchHandle} filter={filter} setFilter={setFilter} />
            <Category filter={filter} setFilter={setFilter} />
            <List item={itemList} filter={filter} />
        </View>
    );
}

export default HomeScreen;