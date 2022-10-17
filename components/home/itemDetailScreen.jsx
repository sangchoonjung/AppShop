import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BaseFont from "../../assets/font/base";
import CustomButton from "../../custom/customButton";
import MainHeader from "../mainheader";
import ItemBuyAndZzim from "./itemBuyAndZzim";
import QnaReviewModal from "./qnaAndReview/qnaReviewModal";
// import QnaReviewModal from "./qnaAndReview/qnaReviewModal";
import SetTime from "./setTime";

function ItemDetailScreen() {
  const route = useRoute();
  const data = route.params.tag;
  // console.log(data,"datas");
  const [modalVisible, setModalVisible] = useState(false);
  const [qnaReviewModalVisible,setQnaReviewModalVisible] =useState(false)

  const [disable,setDisable] = useState(false);






  const setDisableHandle = () => {
    //잔여시간 0이하로 내려가면 기능 막기
    setDisable(true)
  }


  const timeLimit= "2022-10-15"
  // const timeLimit = data?.dueDate
  //20분 가정
const qnaOpenHandle =()=>{
  setQnaReviewModalVisible(current=>!current)
}




  // const imageuri = 'data:image/png;base64,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'
  return (
    <View style={styles.contain}>
      <View>
        <MainHeader/>
      </View>

      <ScrollView>
        <View style={{ margin: 10 }}>
          <BaseFont style={{ fontSize: 25 }}>{data.title}</BaseFont>
          <BaseFont>(평점)(평점갯수)</BaseFont>
          {/* 남은시간 컴포넌트 */}
          <View style={styles.timerContain}>
            <SetTime
              timeLimit={timeLimit}
              setDisableHandle={() => setDisableHandle(data.key)}
            />
          </View>
          <Image
            source={{ uri: data.titleImage }}
            style={styles.titleImageContain}
            resizeMode={"contain"}
          />
          <View style={styles.priceContain}>
            <BaseFont style={styles.priceText}>
              Standard Price ${data.standardFee}
            </BaseFont>
          </View>
          
          <View style={styles.textContain}>
            <BaseFont style={{ fontWeight: "bold", marginBottom: 10 }}>
              Details
            </BaseFont>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
              }}
            >
              <BaseFont style={{ color: "#666666", flex: 1 }}>
                category
              </BaseFont>
              <BaseFont style={{ flex: 1 }}>{data.category}</BaseFont>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
              }}
            >
              <BaseFont style={{ color: "#666666", flex: 1 }}>
                Delivery method
              </BaseFont>
              <BaseFont style={{ flex: 1 }}>{data["Delivery method"]}</BaseFont>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
              }}
            >
              <BaseFont style={{ color: "#666666", flex: 1 }}>From</BaseFont>
              <BaseFont style={{ flex: 1 }}>{data.from}</BaseFont>
            </View>
          </View>
          {/* QnA, 리뷰 띄우기 모달 */}
          <View style={{}}>
            <CustomButton onPress={qnaOpenHandle} style={styles.qnaReviewModalButton}>QnA / Review</CustomButton>
          </View>

          <View style={styles.detailImgContain}>
            <Image
              source={{ uri: data.detailImage }}
              style={styles.detailImg}
              resizeMode={"contain"}
            />
          </View>
        </View>
      </ScrollView>

        <View>
          <QnaReviewModal
                    setModalVisible={setQnaReviewModalVisible}
                    modalVisible={qnaReviewModalVisible}
                    data={data}
          />
        {/* Q&A 리뷰 모달 => 탭뷰 */}
      </View>

      <View>
        {/* 구매,찜하기 모달 */}
        <ItemBuyAndZzim 
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          data={data}
          disable={disable}
        />  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  titleImageContain: {
    width: "100%",
    height: 350,
    marginVertical: 5,
  },
  priceContain: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    marginHorizontal: 20,
    padding: 20,
    borderBottomWidth:1

  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textContain: {
    marginVertical: 10,
    flex: 1,
  },
  detailImgContain: {
    elevation: 1,
  },
  detailImg: {
    width: "100%",
    height: 3000,
  },
  timerContain: {
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: "#999999",

  },
  qnaReviewModalButton:{
    paddingVertical:15,
    textAlign:"left",
    marginHorizontal:0,
    borderRadius:5
  }
});

export default ItemDetailScreen;
