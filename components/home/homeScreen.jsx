import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { AppContext } from "../../context/auth";
import { readAllProduct } from "../../util/product";
import MainHeader from "../header";
import Header from "../header";
import Category from "./category";
import SearchBar from "./searchBar";

function HomeScreen() {

    useEffect(() => {
        readAllProduct().then(p => {
            console.log(p);
        })
    }, []);
    
    const ctx = useContext(AppContext);
    
    return (
        <View>
            <MainHeader />
            <Text>환영합니다 ! {ctx.auth?ctx.auth.id:""} 님</Text>
            <SearchBar />
            <Category/>
            
        </View>
    );
}

export default HomeScreen;