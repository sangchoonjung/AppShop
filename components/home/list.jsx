import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { requestAllProduct } from "../../util/product";
import Item from "./item";

function List({ item }) {
  // console.log(item,"????????????????????????????")
  const [refresh, setRefresh] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshing={refresh}
        onRefresh={async () => {
          setRefresh(true);
          await requestAllProduct();
          setTimeout(() => {
            setRefresh(false);
          }, 1000);
        }}
        data={item}
        renderItem={({ item }) => <Item data={item} key={item?.key} />}
        showsVerticalScrollIndicator={false} />
    </View>
  );
}

export default List;
