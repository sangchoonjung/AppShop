import { useContext, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { AppContext } from "../../../../context/auth";
import Item from "../../../home/item";

function CompletedItemList({ item, refreshOneProduct }) {
  const ctx = useContext(AppContext);
  const [refresh, setRefresh] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshing={refresh}
        onRefresh={async () => {
          setRefresh(true);
          await requestCompleteProductList(ctx.completeList);
          setTimeout(() => {
            setRefresh(false);
          }, 1000);
        }}
        data={item}
        renderItem={({ item }) => (
          <Item
            data={item}
            key={item?.SKU}
            refreshOneProduct={refreshOneProduct}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default CompletedItemList;
