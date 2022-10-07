import { FlatList, Text, View } from "react-native";
import Item from "./item";

function List({ item }) {
    // console.log(item,"????????????????????????????")

    return (
        <>
            <View>
                <Text> 임시</Text>
                <View>

                <FlatList data={item} renderItem={
                    ({item})=> <Item data={item} key={item.key}/>
                } >
                </FlatList>
                    </View>
            </View>
        </>
    );
}

export default List;