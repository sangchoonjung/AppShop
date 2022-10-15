import { useContext, useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../../context/auth";
import {
  requestCompleteProductList,
  requestPendingProductList,
} from "../../../util/product";

import List from "../../home/list";
import MainHeader from "../../mainheader";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "../../../custom/customButton";
import BaseFont from "../../../assets/font/base";

import TabViewExample from "./tabViewNavigator";

function MypageScreen({ navigation }) {
  const [pendingList, setPendingList] = useState([]);
  const [completeList, setCompleteList] = useState([]);
  const ctx = useContext(AppContext);

  useEffect(() => {
    requestPendingProductList(ctx.pendingList)
      .then((item) => {
        if (item && item?.result && item.message.length > 0) {
          setPendingList(item.message);
        }
      })
      .catch((e) => console.log(e.message));

    requestCompleteProductList(ctx.completeList)
      .then((item) => {
        if (item && item?.result && item.message.length > 0) {
          setCompleteList(item.message);
        }
      })
      .catch((e) => console.log(e.message));
  }, [ctx.pendingList, ctx.completeList]);



  // console.log(pendingList)
  // console.log(completeList)




  useEffect(() => {
    requestCompleteProductList(ctx.completeList)
      .then((item) => {
        if (item && item?.result) {
          // console.log(ctx.completeList)
          setCompleteList(item.message);
        }
      })
      .catch((e) => console.log(e.message));
  }, [ctx.completeList]);


  // console.log(pendingList.length,"렝쓰ㅡ으으으으")
  // console.log(pendingList)


  const updateNavigationHandle = () => {
    navigation.navigate("update", { id: ctx.auth.id, email: ctx.auth.email });
  };


  const refreshOneProduct = (updateProduct) => {
    // setItemList
    // console.log(updateProduct, "updateProduct")
    const except = completeList.map(e => e.key !== updateProduct.key)
    // setCompleteList({ ...except, updateProduct });
  }

  return (
    <View style={styles.mainContain}>
      <View style={styles.accountSetting}>
        <Pressable
          style={({ pressed }) => (pressed ? { opacity: 0.5 } : null)}
          onPress={updateNavigationHandle}
        >
          <MaterialCommunityIcons name="account" size={50} color="#0064FF" style={{ marginTop: 10 }} />
        </Pressable>
      </View>
      <View>
        <BaseFont style={{ marginLeft: 30, marginBottom: 5 }}>Welcome, {ctx.auth.id} !</BaseFont>
      </View>
      <View style={{ flex: 1 }}>
        {(pendingList.length > 0 || completeList.length > 0) && (
          <TabViewExample
            pendingList={pendingList}
            completeList={completeList}
            refreshOneProduct={refreshOneProduct}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContain: {
    flex: 1,
  },
  logoutContain: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 30,
  },
  accountSetting: {
    flexDirection: "row",
    margin: 20,
    marginBottom: 5,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    borderColor: "#999999"
  },
});

export default MypageScreen;
