import { useContext, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { AppContext } from "../../../../context/auth";
import { requestPendingProductList } from "../../../../util/product";
import Item from "../../../home/item";

function PendedItemList({ item }) {
  const ctx = useContext(AppContext);
  const [refresh, setRefresh] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshing={refresh}
        onRefresh={async () => {
          setRefresh(true);
          await requestPendingProductList(ctx.pendingList);
          setTimeout(() => {
            setRefresh(false);
          }, 1000);
        }}
        data={item}
        renderItem={({ item }) => <Item data={item} key={item?.SKU} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default PendedItemList;
