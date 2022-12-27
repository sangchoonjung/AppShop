import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../../context/auth";
import {
  requestCompleteProductList,
  requestPendingProductList,
} from "../../../util/product";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TabViewExample from "./tabViewNavigator";
import { sendPendToCompleteReqDummy } from "../../../util/userInfo";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/core";

function MypageScreen({ navigation }) {
  const [pendingList, setPendingList] = useState([]);
  const [completeList, setCompleteList] = useState([]);
  const ctx = useContext(AppContext);
  const navi = useNavigation();
  // 구매하러가기 버튼
  const goToHome = () => {
    navi.navigate("mainHome");
  };

  // 펜딩, 컴플리트 아이템 데이터 불러오기
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

  // const testButton = async () => {
  //   try {
  //     const result = await sendPendToCompleteReqDummy(
  //       ctx.auth.id,
  //       ctx.pendingList
  //     );
  //     console.log(result, "결과!");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
      {/* 헤더 정보수정 */}
      <Pressable
        style={[({ pressed }) => (pressed ? { opacity: 0.3 } : null)]}
        onPress={updateNavigationHandle}
      >
        <View style={styles.accountSetting}>
          <MaterialCommunityIcons name="account" size={50} color="#1E90FF" />
          <Text>내 정보 수정</Text>
        </View>
      </Pressable>
      {/* 펜딩,컴플리트 전환 탭 */}
      <View style={{ flex: 1 }}>
        {(pendingList.length > 0 || completeList.length > 0) && (
          <TabViewExample
            pendingList={pendingList}
            completeList={completeList}
            refreshOneProduct={refreshOneProduct}
          />
        )}
        {/* 펜딩,컴플리트 아이템이 없을때 */}
        {!pendingList.length > 0 && !completeList.length > 0 && (
          <View style={styles.textContai}>
            <Text style={styles.exceptText}>구매한 상품이 없어요</Text>
            <View style={styles.goToBuyButton}>
              <Button
                title="구매하러가기"
                style={styles.goToBuyButton}
                onPress={goToHome}
              />
            </View>
          </View>
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingTop: 20,
    borderColor: "#999999",
    marginHorizontal: 10,
  },
  textContai: {
    justifyContent: "center",
    height: "70%",
  },
  exceptText: {
    textAlign: "center",
    fontSize: 30,
    textShadowColor: "#1663be",
    textShadowRadius: 5,
    color: "#222222",
    fontWeight: "500",
  },
  goToBuyButton: {
    marginHorizontal: 50,
  },
});

export default MypageScreen;
