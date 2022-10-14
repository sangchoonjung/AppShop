import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import BaseFont from "../../assets/font/base";
import { AppContext } from "../../context/auth";
import CustomButton from "../../custom/customButton";
import { dateCutting } from "../../util/function";
import { requestZzimProduct } from "../../util/product";
import { sendZzimUpdateRequest } from "../../util/userInfo";
import ItemBuyAndZzim from "./itemBuyAndZzim";
import ReviewModal from "./reviewModal";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import FixamountUnit from "../account/mypage/fixamountUnit";

function Item({ data,refreshOneProduct }) {
  const navigation = useNavigation();
  const ctx = useContext(AppContext);

  const [reiviewModalOpen,setReiviewModalOpen] = useState(false)

  const[reviewButton,setReviewButton] = useState(true)

useEffect(()=>{
if(ctx.completeReview.includes(data.key)){
  setReviewButton(false)
}
},[ctx.completeReview])


  const [modalVisible, setModalVisible] = useState(false);
  
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



  const goToReivew=()=>{
    setReiviewModalOpen(current=>!current)
  }

const deleteHandler = async () => {
    const zzimList = ctx.zzimList;
    let result;
    if (zzimList.some((e) => e.id === String(data.key))) {
      result = zzimList.filter((e) => e.id !== String(data.key));
      ctx.setZzim(result);
    }
    await sendZzimUpdateRequest(ctx.auth.id, result);
  };

  // const addedDate = data?.date ? dateCutting(data?.date) : "";

  return (
    <Pressable onPress={detailNavigation}>
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: data.titleImage }}
          style={styles.left}
          resizeMode={"contain"}
        />

        <View style={styles.right}>
          <BaseFont>No.{data.key}</BaseFont>
          <BaseFont>
            {data.title.length > 30
              ? data.title.substring(0, 25) + "..."
              : data.title}
          </BaseFont>
          <BaseFont>(별점자리)</BaseFont>

          <BaseFont>
            {data.unit ? (
              <View style={styles.mountFixContain}>
                <View>
                  <BaseFont>Unit : {data.unit} ea</BaseFont>
                  <BaseFont
                    style={{ color: "#0064FF", fontSize: 18, marginTop: 10 }}
                  >
                    Total : $ {data.price}
                  </BaseFont>
                </View>
                <View>
                  {/* 모달 */}
                  {data?.type!=="complete"&&
                  //구매후에는 fix안되게 수정
                  <FixamountUnit
                  setModalVisible={setModalVisible}
                  modalVisible={modalVisible}
                  data={data}
                  />
                }
                </View>
              </View>
            ) : (
              `$ ${data.standardFee}.00`
            )}
          </BaseFont>
          {data?.zzimType && (
            <View style={styles.zzimListButton}>

              <CustomButton
                style={styles.zzimButtonView}
                onPress={detailNavigation}
              >
                <AntDesign name="search1" size={20} color="white" />
              </CustomButton>
              <CustomButton
                style={styles.zzimButtonDelete}
                onPress={deleteHandler}
              >
                <Feather name="trash-2" size={20} color="white" />
              </CustomButton>

            </View>
          )}
          {(data?.type==="complete"&&reviewButton)&&(
            <View style={styles.goToReivew}>
              <CustomButton onPress={goToReivew} style={styles.zzimButtonView}>Write Review</CustomButton>
            </View>
          )
          }
          <View>
            <ReviewModal
            reiviewModalOpen={reiviewModalOpen}
            setReiviewModalOpen={setReiviewModalOpen}
            refreshOneProduct={refreshOneProduct}
            data={data}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    margin: 5,
    backgroundColor: "white",
    flex: 1,
  },
  left: {
    flex: 1,
    margin: 5,
    paddingVertical: -20,
    width: "100%",
    height: 170,
  },
  right: {
    width: "50%",
    justifyContent: "space-evenly",
  },

  zzimListButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
  zzimButtonView: {
    marginHorizontal: 8,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  zzimButtonDelete: {
    marginHorizontal: 8,
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: "#444444",
  },
  buyList: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 5,
  },
  mountFixContain: {
    flexDirection: "row",
    alignItems: "center",
  },
  mountFixButton: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginLeft:30
  }
});
export default Item;
