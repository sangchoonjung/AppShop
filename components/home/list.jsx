import { FlatList, Text, View } from "react-native";
import Item from "./item";

function List({ item }) {
  // console.log(item,"????????????????????????????")

  return (
    <>
      <View>
        <Text style={{fontSize:20,color:"red"}}>상품 리스트</Text>
        <View>
          <FlatList
            data={item}
            renderItem={({ item }) => <Item data={item} key={item.key} />}
          />
        </View>
      </View>
    </>
  );
}

export default List;
