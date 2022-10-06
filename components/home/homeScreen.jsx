import { Text, View } from "react-native";
import MainHeader from "../header";
import Header from "../header";
import SearchBar from "./searchBar";

function HomeScreen() {
    return (
        <View>
            <MainHeader />
            <SearchBar/>
            <Text>메인</Text>
        </View>
    );
}

export default HomeScreen;