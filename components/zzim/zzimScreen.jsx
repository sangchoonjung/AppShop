import { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { AppContext } from "../../context/auth";
import { requestZzimProduct } from "../../util/product";
import List from "../home/list";
import MainHeader from "../mainheader";

function ZzimScreen() {
    const [itemList, setItemList] = useState([]);
    const ctx = useContext(AppContext);

    const [selected, setSelected] = useState(true);

    useEffect(() => {
        requestZzimProduct(ctx.zzimList).then(list => {
            if (list) {
                list.message.reverse()
                setItemList(list.message)
            }
        })
            .catch(e => console.log(e))
    }, [ctx.zzimList])





    const newestHandle = () => {
        setSelected(current => !current);
        setItemList(current => current.sort((a, b) => a.date - b.date));

    }


    const oldestHandle = () => {
        setSelected(current => !current);
        setItemList(current => current.sort((b, a) => a.date - b.date));

    }
    return (
        <View>
            <MainHeader back={true} />
            {/* <Text>찜스크린</Text> */}
            <View style={styles.sortContainer}>
                <Text>
                    {`Sort by :  `}
                </Text>
                <Pressable onPress={newestHandle}>
                    <Text style={selected ? styles.select : styles.defaulted}>Newest </Text>
                </Pressable>
                <Text > / </Text>

                <Pressable onPress={oldestHandle}>
                    <Text style={!selected ? styles.select : styles.defaulted}> Oldest </Text>
                </Pressable>
            </View>
            <List item={itemList} />
            {/* height 지정 필요 */}
        </View>
    );
}

const styles = StyleSheet.create({
    sortContainer: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    select: {
        fontWeight: "bold"
    },
    defaulted: {

    }

})
export default ZzimScreen;