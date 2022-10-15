import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import BaseFont from "../../common/base";
import { Entypo } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/auth";
import { Feather } from "@expo/vector-icons";
import { sendProductPendingAddRequest } from "../../../util/account";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../../custom/customButton";

function FixamountUnit({ modalVisible, setModalVisible, data }) {
  const [heartOnOff, setHeartOnOff] = useState(false);
  const [productCount, setProductCount] = useState(1);
  const [pend, setPend] = useState(false);

  const ctx = useContext(AppContext);
  const zzimList = ctx.zzimList;
  const setZzim = ctx.setZzim;
  const pendingList = ctx.pendingList;

  const navigation = useNavigation();
  // console.log(pendingList)
  /*
  초기세팅
  계정에 있는 zzimList에 이 항목이 있으면 true
  서버로 업데이트 하는김에 찜 목록을 재작성해서 ctx에 올려둠
  */
  useEffect(() => {
    if (pendingList.some((e) => e.productId === data.key)) {
      setPend(true);
    }
  }, [pendingList]);

  const countHandlerUp = () => {
    setProductCount(productCount + 1);
  };
  const countHandlerDown = () => {
    setProductCount(productCount - 1);
  };

  const pendingHandle = async () => {
    const recv = await sendProductPendingAddRequest(
      ctx.auth.id,
      data.key,
      productCount,
      productCount * data.standardFee
    );
    // console.log(recv,"pendingggg")
    ctx.setPendingList(recv);
    setModalVisible(false);
    navigation.navigate("mypage");
  };

  //pending alert 버튼
  const modalConfirmButton = () => {
    Alert.alert("Buy Confirm", "Do you really want to register for purchase?", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: pendingHandle,
      },
    ]);
  };
  // console.log(data.key,ctx.auth.id)

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <BaseFont style={styles.modalProductName}>{data.title}</BaseFont>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <BaseFont style={{ fontSize: 20 }}>count _ </BaseFont>
                <Text style={styles.modalcount} onPress={countHandlerDown}>
                  -
                </Text>
                <BaseFont style={{ fontSize: 20 }}>{productCount}</BaseFont>
                <Text style={styles.modalcount} onPress={countHandlerUp}>
                  +
                </Text>
              </View>
              <BaseFont style={styles.modalTotalPrice}>
                Total $ {data.standardFee * productCount}
              </BaseFont>
            </View>
            {/* 모달 버튼 */}

            <View style={styles.modalButtonContain}>
              <CustomButton
                style={styles.modalButton}
                onPress={modalConfirmButton}
              >
                pend
              </CustomButton>

              <CustomButton
                style={styles.modalButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                cancel
              </CustomButton>
            </View>
          </View>
        </View>
      </Modal>

      {/* 모달 띄우기 */}
      <View style={styles.blockLayout}>
        <CustomButton
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.fixButton}
        >
          <Feather name="tool" size={28} color="white" style={{opacity:0.7}}/>
        </CustomButton>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#006699",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    flex: 1,
  },
  buttonClose: {
    backgroundColor: "green",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
  blockLayout: {
    flexDirection: "row",
    width: "100%",
  },
  heartLayout: {
    justifyContent: "center",
    backgroundColor: "#A5D8FA",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  modalcount: {
    fontSize: 15,
    backgroundColor: "#999999",
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  modalProductName: {
    fontSize: 20,
    marginBottom: 20,
    justifyContent: "center",
  },
  modalTotalPrice: {
    fontSize: 25,
    marginTop: 20,
    textAlign: "center",
  },
  modalButtonContain: {
    flexDirection: "row",
    marginTop: 20,
  },
  modalButton: {
    marginHorizontal: 20,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  fixButton:{
    padding:6,
    paddingVertical:6
  }

});

export default FixamountUnit;
