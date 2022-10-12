import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../../context/auth";
import { requestPendingProductList } from "../../../util/product";
import { requestCompleteProductList } from "../../../util/product";
import List from "../../home/list";
import MainHeader from "../../mainheader";
import TabViewExample from "./tabViewNavigator";

function MypageScreen({ navigation }) {
  const [pendingList, setPendingList] = useState([]);
  const [completeList, setCompleteList] = useState([]);
  const ctx = useContext(AppContext);


  useEffect(() => {

    requestPendingProductList(ctx.pendingList).then(
      item => {
        if (item && item?.result) {
          setPendingList(item.message)
        }
      }
    ).catch(e => console.log(e.message));

  }, [ctx.pendingList]);
  // console.log(pendingList)


  useEffect(() => {
    requestCompleteProductList(ctx.completeList).then(
      item => {
        if (item && item?.result) {
          setCompleteList(item.message)
        }
      }
    ).catch(e => console.log(e.message));

  }, [ctx.completeList]);



  const logoutHandle = () => {
    return ctx.logout();
  }
  const updateNavigationHandle = () => {
    navigation.navigate("update", { id: ctx.auth.id, email: ctx.auth.email })
  }




  return (


    <>
      <View style={{ flex: 1 }}>
        {/* <View style={styles.mainContain}> */}
        <MainHeader back={true} />
        <Text>프로필 수정</Text>
        <Button title="수정하기" onPress={updateNavigationHandle} />

        {pendingList.length > 0 && <TabViewExample pendingList={pendingList} completeList={completeList} />}

        {/* </View> */}


        <View style={styles.logoutContain}>
          <Button title="logout" onPress={logoutHandle} />
        </View>
      </View>

    </>
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