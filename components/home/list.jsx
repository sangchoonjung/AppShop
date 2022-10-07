import { FlatList, Text, View } from "react-native";
import Item from "./item";

function List({ item, filter }) {
    // console.log(item,"????????????????????????????")

    return (
        <>
            <View>
                <Text> 임시</Text>
                <View>

                <FlatList data={filter ? item.filter(e => e) : item} renderItem={
                    ({item})=> <Item data={item} key={item.key}/>
                } >
                    {/* // 필터 테스트 필요 (코드작성안했음) */}
                </FlatList>
                    </View>
            </View>
        </>
    );
}

export default List;