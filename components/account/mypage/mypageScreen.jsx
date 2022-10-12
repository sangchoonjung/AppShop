import { useContext, useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../../context/auth";
import { requestPendingProduct } from "../../../util/product";
import List from "../../home/list";
import MainHeader from "../../mainheader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "../../../custom/customButton";
import BaseFont from "../../../assets/font/base";
function MypageScreen({ navigation }) {
  const [pendingList, setPendingList] = useState([]);
  const ctx = useContext(AppContext);

  useEffect(() => {
    requestPendingProduct(ctx.pendingList)
      .then((item) => {
        if (item && item?.result) {
          setPendingList(item.message);
        }
      })
      .catch((e) => console.log(e.message));
  }, [ctx.pendingList]);
  // console.log(pendingList)
  const logoutHandle = () => {
    return ctx.logout();
  };
  const updateNavigationHandle = () => {
    navigation.navigate("update", { id: ctx.auth.id, email: ctx.auth.email });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mainContain}>
        <View style={styles.accountSetting}>
          <Pressable
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : null)}
            onPress={updateNavigationHandle}
          >
            <MaterialCommunityIcons name="account" size={40} color="#0064FF" />
          </Pressable>
        </View>
        <View>
          <BaseFont style={{ marginLeft: 20 }}>
            Welcome, {ctx.auth.id} !
          </BaseFont>
        </View>
        <View style={{ flex: 1 }}>
          <Text>Pending... </Text>
          <List item={pendingList} />
          <Text>Complete...</Text>
        </View>
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
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
});

export default MypageScreen;
