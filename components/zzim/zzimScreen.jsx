import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import BaseFont from "../../assets/font/base";
import { AppContext } from "../../context/auth";
import { requestZzimProduct } from "../../util/product";
import List from "../home/list";
import MainHeader from "../mainheader";

function ZzimScreen() {
    const [itemList, setItemList] = useState([]);
    const ctx = useContext(AppContext);
    
    const [selected, setSelected] = useState(true);
    const focused = useIsFocused();
    useEffect(() => {
        requestZzimProduct(ctx.zzimList).then(list => {
            if (list) {
                list.message.reverse()
                setItemList(list.message)
                console.log(list)
            }
        })
            .catch(e => console.log(e))
        if (!focused) {
            return;
        }
        console.log(focused);
    }, [ctx.zzimList])


    // console.log(itemList,"?????????????????????????")

    const newestHandle = () => {
        if (selected) {
            return;
        }
        setSelected(true);
        setItemList(current => current.sort((b, a) => a.date - b.date));

    }


    const oldestHandle = () => {
        if (!selected) {
            return;
        }
        setSelected(false);
        setItemList(current => current.sort((a, b) => a.date - b.date));

    }
    return (
      <View style={styles.main}>
        <MainHeader back={true} />
        <View style={styles.boxContain}>
          <BaseFont style={{fontSize:15}}>My WishList</BaseFont>
        </View>
        <View style={styles.sortContainer}>
          <Pressable onPress={newestHandle}>
            <Text style={selected ? styles.select : styles.defaulted}>
              Newest{" "}
            </Text>
          </Pressable>
          <Text> / </Text>
          <Pressable onPress={oldestHandle}>
            <Text style={!selected ? styles.select : styles.defaulted}>
              {" "}
              Oldest{" "}
            </Text>
          </Pressable>
        </View>

        {itemList.length > 0 && <List item={itemList} />}
        {/* height 지정 필요 */}
      </View>
    );
}

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
    marginVertical: 3,
  },
  select: {
    fontWeight: "bold",
  },
  defaulted: {},
  main: {
    flex: 1,
  },
  boxContain: {
      backgroundColor: "#B4FBFF",
      alignItems: "center",
    paddingVertical:20
  },
});
export default ZzimScreen;