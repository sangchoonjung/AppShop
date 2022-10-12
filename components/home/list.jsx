import { useContext, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { AppContext } from "../../context/auth";
import { requestAllProduct } from "../../util/product";
import Item from "./item";

function List({ item }) {
  const ctx = useContext(AppContext);
  const zzimList = ctx.zzimList;
  const setZzim = ctx.setZzim;
  console.log(zzimList)
  
  

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
        renderItem={({ item }) => <Item data={item} key={item.key} />}
        showsVerticalScrollIndicator={false} />
      
    </View>
  );
}

export default List;
