import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../../context/auth";
import { requestPendingProduct } from "../../../util/product";
import List from "../../home/list";
import MainHeader from "../../mainheader";

function MypageScreen({ navigation }) {
  const [pendingList, setPendingList] = useState([]);
  const ctx = useContext(AppContext);


  useEffect(() => {

    requestPendingProduct(ctx.pendingList).then(
      item => {
        if (item && item?.result) {
          setPendingList(item.message)
        }
      }
    ).catch(e => console.log(e.message));

  }, [ctx.pendingList]);
  // console.log(pendingList)
  const logoutHandle = () => {
    return ctx.logout();
  }
  const updateNavigationHandle = () => {
    navigation.navigate("update", { id: ctx.auth.id, email: ctx.auth.email })
  }




  return (


    <View style={{ flex: 1 }}>
      <View style={styles.mainContain}>
        <MainHeader back={true} />
        <Text>프로필 수정</Text>
        <Button title="수정하기" onPress={updateNavigationHandle} />

        <View style={{flex:1}}>
          <Text>Pending... </Text>
          <List item={pendingList} />
          <Text>Complete...</Text>
          
        </View>


      </View>


      <View style={styles.logoutContain}>
        <Button title="logout" onPress={logoutHandle} />
      </View>
    </View>

  );
}
const styles = StyleSheet.create({
  mainContain: {
    flex: 1
  },
  logoutContain: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 30
  }

})

export default MypageScreen;