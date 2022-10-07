import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import BaseFont from "../../assets/font/base";

function Item({ data }) {
  const navigation = useNavigation();

  const detailNavigation = () => {
    navigation.navigate("detail", { tag: data });
  };

  return (
    <>
      <View style={styles.itemContainer}>
        <Pressable onPress={detailNavigation} style={styles.left}>
          {/* pressable 영역 조절 필요 */}
          <Image
            source={{ uri: data.titleImage }}
            style={styles.titleImage}
            resizeMode={"contain"}
          />
        </Pressable>
        <View style={styles.right}>
          <BaseFont>No.{data.key}</BaseFont>
          <BaseFont>{data.title}</BaseFont>
          <BaseFont>(별점자리)</BaseFont>
          <View>
            <BaseFont
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                margin: 10,
              }}
            >
              Standard $ {data.standardFee}
            </BaseFont>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginVertical: 2,
    borderColor: "#CCCCCC",
  },
  left: {
    flex: 1,
    margin: 5,
    paddingVertical: -20,
  },
  right: {
    width: "50%",
  },
  titleImage: {
    width: "100%",
    height: 170,
  },
});
export default Item;
