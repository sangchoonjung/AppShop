import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import BaseFont from "../../assets/font/base";
import { AppContext } from "../../context/auth";
import { dateCutting } from "../../util/function";

function Item({ data }) {
  const navigation = useNavigation();
  const ctx = useContext(AppContext);
  const detailNavigation = () => {
    console.log(ctx.auth)
    if(ctx.auth){
      navigation.navigate("detail", { tag: data });
    }else{
      Alert.alert(
        "Login Confirm",
        "You must log in to view details",
        [
        {text:"Cancel",
        onPress:()=>console.log("cancel pressed"),
        style:"cancel"},
        {text:"OK",
        onPress:()=>navigation.navigate("account"),
        style:"default"} ,
        ]   
    )
    }
  };



  const addedDate = data?.date?dateCutting(data?.date):""

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
            $ {data.standardFee}.00
            </BaseFont>
            {data?.date&&<Text>추가한 날짜{addedDate}</Text>}
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
    margin: 5,
    borderColor: "#999999",
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
