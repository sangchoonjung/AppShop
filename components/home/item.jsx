import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import BaseFont from "../../assets/font/base";
import { AppContext } from "../../context/auth";
import CustomButton from "../../custom/customButton";
import { dateCutting } from "../../util/function";
import { requestZzimProduct } from "../../util/product";
import ItemBuyAndZzim from "./itemBuyAndZzim";

function Item({ data }) {
  const navigation = useNavigation();
  const ctx = useContext(AppContext);

  const detailNavigation = () => {
    console.log(ctx.auth);
    if (ctx.auth) {
      navigation.navigate("detail", { tag: data });
    } else {
      Alert.alert("Login Confirm", "You must log in to view details", [
        {
          text: "Cancel",
          onPress: () => console.log("cancel pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => navigation.navigate("account"),
          style: "default",
        },
      ]);
    }
  };


  // console.log(data.zzimType, "찜타입이 있나요?")
  const addedDate = data?.date ? dateCutting(data?.date) : "";
  
  const goToItemDetail = () => {
    navigation.navigate("detail", { tag: ctx.zzimList });
  }
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
          <BaseFont>
            {data.title.length > 30
              ? data.title.substring(0, 25) + "..."
              : data.title}
          </BaseFont>
          <BaseFont>(별점자리)</BaseFont>
          <View>
            <BaseFont
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                margin: 5,
              }}
            >
              {data.unit?
              `TOTAL:$${data.price}.00(unit:${data.unit}) `
              :
              `$ ${data.standardFee}.00`
              }
            </BaseFont>
          </View>
          {data?.zzimType && (
            <View style={styles.zzimListButton}>

              <CustomButton style={styles.zzimButtonItem}>delete</CustomButton>
            </View>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    backgroundColor: "white",
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
  zzimListButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
  zzimButtonItem: {
    marginHorizontal: 10,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
});
export default Item;
