import { useContext, useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../../context/auth";
import {
  requestCompleteProductList,
  requestPendingProductList,
} from "../../../util/product";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BaseFont from "../../../assets/font/base";
import TabViewExample from "./tabViewNavigator";
import { sendPendToCompleteReqDummy } from "../../../util/userInfo";

function MypageScreen({ navigation }) {
  const [pendingList, setPendingList] = useState([]);
  const [completeList, setCompleteList] = useState([]);
  const ctx = useContext(AppContext);

  useEffect(() => {
    requestPendingProductList(ctx.pendingList)
      .then((item) => {
        if (item && item?.result && item.message.length > 0) {
          setPendingList(item.message);
          // console.log(item.message)
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

  console.log(pendingList);

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
  const testButton = async () => {
    try {
      const result = await sendPendToCompleteReqDummy(
        ctx.auth.id,
        ctx.pendingList
      );
      console.log(result, "결과!");
    } catch (e) {
      console.log(e);
    }
  };

  const updateNavigationHandle = () => {
    navigation.navigate("update", { id: ctx.auth.id, email: ctx.auth.email });
  };

  const refreshOneProduct = (updateProduct) => {
    // setItemList
    if (!updateProduct) {
      return;
    }
    console.log(updateProduct, "updateProduct");
    const except = completeList.map((e) => {
      if (e.key !== updateProduct.key) {
        return e;
      }
    });
    // console.log(except)
    setCompleteList(updateProduct);
  };
  return (
    <View style={styles.mainContain}>
      <View style={styles.accountSetting}>
        <Pressable
          style={[({ pressed }) => (pressed ? { opacity: 0.5 } : null)]}
          onPress={updateNavigationHandle}
        >
          <View>
            <MaterialCommunityIcons
              name="account"
              size={50}
              color="#1E90FF"
              style={{ marginTop: 10 }}
            />
            <Text>내정보 수정</Text>
          </View>
        </Pressable>
      </View>
      <View>
        <BaseFont style={{ marginLeft: 30, marginBottom: 5 }}>
          Welcome, {ctx.auth.id} !
        </BaseFont>
      </View>
      <View style={{ flex: 1 }}>
        {(pendingList.length > 0 || completeList.length > 0) && (
          <TabViewExample
            pendingList={pendingList}
            completeList={completeList}
            refreshOneProduct={refreshOneProduct}
          />
        )}

        {!pendingList.length > 0 && !completeList.length > 0 && (
          <View style={styles.textContai}>
            <Text style={styles.exceptText}>No Products in Progress</Text>
          </View>
        )}
        <Button title="테스트" onPress={testButton} />
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
    flexDirection: "column",
    margin: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    borderColor: "#999999",
  },
  textContai: {
    justifyContent: "center",
    height: "65%",
  },
  exceptText: {
    textAlign: "center",
    fontSize: 32,
    textShadowColor: "#1663be",
    textShadowRadius: 5,
    color: "#222222",
    fontWeight: "500",
  },
});

export default MypageScreen;
