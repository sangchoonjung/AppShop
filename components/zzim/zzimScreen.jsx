import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert, Button } from "react-native";
import BaseFont from "../../assets/font/base";
import { AppContext } from "../../context/auth";
import CustomButton from "../../custom/customButton";
import { requestZzimProduct } from "../../util/product";
import { sendPendToCompleteReqDummy } from "../../util/userInfo";
import List from "../home/list";
import MainHeader from "../mainheader";

function ZzimScreen({ navigation }) {
  const [itemList, setItemList] = useState([]);
  const ctx = useContext(AppContext);

  const [selected, setSelected] = useState(true);
  const focused = useIsFocused();

  const onPressPendToComplete = async() => {
    //더미코드
    // console.log(ctx.auth.id)
    // console.log(ctx.pendingList)
    const rst =  await sendPendToCompleteReqDummy(ctx.auth.id,ctx.pendingList)
    // console.log(rst)
  }

  useEffect(() => {
    requestZzimProduct(ctx.zzimList).then(list => {
      if (list) {
        list.message.reverse()
        setItemList(list.message)
        // console.log(list)
      }
    })
      .catch(e => console.log(e))
    if (!focused) {
      return;
    }
    // console.log(focused);
  }, [ctx.zzimList])


  // console.log(itemList,"?????????????????????????")

  const newestHandle = () => {
    if (selected) {
      return;
    }
    setSelected(true);
    setItemList(current => current.sort((b, a) => a.date - b.date));

  }


  const oldestHandle = () => {
    if (!selected) {
      return;
    }
    setSelected(false);
    setItemList(current => current.sort((a, b) => a.date - b.date));

  }
  const goToLoginHandle = () => {
    navigation.navigate("account")
  }
  if (!ctx.auth) {

    return (
      <View style={styles.notLoginCont}>
        <View style={{flex:1,marginTop:200}}>
          <BaseFont style={styles.notLoginTitleTxt}>MEMBER ONLY!</BaseFont>
          <Text>{"\n"}</Text>
          <Text style={styles.notLoginTxt}>Plesae be Login!</Text>
          <CustomButton onPress={goToLoginHandle} style={styles.btnStyle}>
            LOGIN
          </CustomButton>
        </View>
        <View><BaseFont style={{
          fontSize: 12,
          color: "green",
          textShadowColor: "purple",
          textShadowRadius: 5,
          marginBottom:10
        }}>Created By Han and Choon</BaseFont></View>
      </View>
    );
  }




  return (
    <View style={styles.main}>
      <MainHeader back={true} />
      <View style={styles.boxContain}>
        <BaseFont style={{ fontSize: 15 }}>My WishList</BaseFont>
      </View>
      <View style={styles.sortContainer}>
        <Pressable onPress={newestHandle}>
          <Text style={selected ? styles.select : styles.defaulted}>
            Newest{" "}
          </Text>
        </Pressable>
        <Text> / </Text>
        <Pressable onPress={oldestHandle}>
          <Text style={!selected ? styles.select : styles.defaulted}>
            {" "}
            Oldest{" "}
          </Text>
        </Pressable>
      </View>

      {itemList.length > 0 && <List item={itemList} />}
      {/* height 지정 필요 */}

      {/* 더미코드 */}
      {/* ctx업데이트를 안 해서 로그아웃 했다가 와야지 반영됩니다 */}
      {/* <View>
        <Text>pend to complete</Text>
        <Button onPress={onPressPendToComplete} title="임시" />
      </View> */}
      {/* 현재 계정의 팬딩을 컴플리트로 옮기는 코드*/}
    </View>

  );
}

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
    marginVertical: 3,
  },
  select: {
    fontWeight: "bold",
  },
  defaulted: {},
  main: {
    flex: 1,
  },
  boxContain: {
    backgroundColor: "#B4FBFF",
    alignItems: "center",
    paddingVertical: 20
  },
  notLoginCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnStyle: {
    paddingHorizontal: 32,
    
  },
  notLoginTitleTxt: {
    fontSize: 25,
    fontWeight: "bold",
    textShadowColor: "purple",
    textShadowRadius: 5,
    color: "#222222",
    textAlign:"center"
  },
  notLoginTxt: {
    fontSize: 14,
    textShadowColor: "purple",
    textShadowRadius: 2,
    color: "green",
    textAlign:"center"
  }
});
export default ZzimScreen;