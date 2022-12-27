import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import BaseFont from "../../assets/font/base";
import { Entypo } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/auth";
import { sendZzimUpdateRequest } from "../../util/userInfo";
import { sendProductPendingAddRequest } from "../../util/account";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../custom/customButton";
import { format } from "date-fns";
function ItemBuyAndZzim({ modalVisible, setModalVisible, data, deadline }) {
  const [heartOnOff, setHeartOnOff] = useState(false);
  const [productCount, setProductCount] = useState(1);
  const [pend, setPend] = useState(false);
  const [complete, setComplete] = useState(false);
  const ctx = useContext(AppContext);
  const zzimList = ctx.zzimList; //찜한 리스트
  const setZzim = ctx.setZzim; //찜목록 넣기
  const pendingList = ctx.pendingList;
  const completeList = ctx.completeList;
  const navigation = useNavigation();

  const [footer, setFooter] = useState(<></>)
  // console.log(pendingList)
  /*
  초기세팅
  계정에 있는 zzimList에 이 항목이 있으면 true
  서버로 업데이트 하는김에 찜 목록을 재작성해서 ctx에 올려둠
  */
  useEffect(() => {
    if (pendingList?.some((e) => e?.productId === data.key)) {
      setPend(true);
    }
    if (completeList.some((e) => e?.productId === data.key)) {
      setComplete(true);
    }
  }, [pendingList]);
  useEffect(() => {
    if (deadline <= format(Date.now(), "yyyy-MM-dd")
    ) {
      setFooter(<View style={[styles.button, styles.buttonOpen]}>
        <BaseFont style={styles.modalButton}>Time Out!</BaseFont>
      </View>)
    } else if (pend) {
      setFooter(
        <View style={[styles.button, styles.buttonOpen]}>
          <BaseFont style={[styles.textStyle]}>already pending</BaseFont>
        </View>
      );
    } else if (complete) {
      setFooter(
        <View style={[styles.button, styles.buttonOpen]}>
          <BaseFont style={[styles.textStyle]}>already complete</BaseFont>
        </View>
      );
    } else {
      setFooter(
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <BaseFont style={styles.modalButton}>pending now</BaseFont>
        </Pressable>
      );
    }
  }, [pend, complete, deadline])
  //찜한거 렌더링
  useEffect(() => {
    const initZzim = ctx.zzimList;

    if (initZzim.some((e) => e.itemSKU === String(data.SKU))) {
      setHeartOnOff(true);
    } else {
      setHeartOnOff(false);
    }
  }, [zzimList]);

  const countHandlerUp = () => {
    setProductCount(productCount + 1);
  };
  const countHandlerDown = () => {
    setProductCount(productCount - 1);
  };

  const pendingHandle = async () => {
    const recv = await sendProductPendingAddRequest(
      ctx.auth.id,
      data.SKU,
      productCount,
      productCount * data.Price,
      ctx.auth.token
    );
    console.log(recv, "pendingggg");
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

  // 찜버튼 (하트 온오프)
  const heartHandler = async () => {
    let zzim = zzimList;
    try {
      // 삭제

      if (zzimList.some((e) => e.itemSKU === String(data.SKU))) {
        zzim = zzimList.filter((e) => e.itemSKU !== String(data.SKU));
        // console.log(zzim)
        setZzim(zzim);
      } else {
        // 등록
        zzim = [
          ...zzim,
          { itemSKU: String(data.SKU), date: Date.now(), zzimType: true },
        ];
        setZzim(zzim);
      }
      const rst = await sendZzimUpdateRequest(ctx.auth.id, zzim);
    } catch (e) {
      console.log(e.message);
    }
  };
  console.log(zzimList, "리스트");

  // let footer = <></>;


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
        {/* {
          disable ? (
            <View style={[styles.button, styles.buttonOpen]}>
              <BaseFont style={styles.modalButton}>Time Out!</BaseFont>
            </View>
          ) : (
            footer
          )


        } */}

        {footer}
        {/* 찜 on/off */}
        <Pressable style={styles.heartLayout}>
          <Entypo
            name={heartOnOff ? "heart" : "heart-outlined"}
            size={24}
            color="#0064FF"
            onPress={heartHandler}
          />
        </Pressable>
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
    color: "white",
  },
});

export default ItemBuyAndZzim;
