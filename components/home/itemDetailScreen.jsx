import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "@react-navigation/stack";
import { format } from "date-fns";
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
  console.log(data);
  // console.log(data,"datas");
  const [modalVisible, setModalVisible] = useState(false);
  const [qnaReviewModalVisible, setQnaReviewModalVisible] = useState(false);
  const [rating, setRating] = useState([]);
  const [disable, setDisable] = useState(false);
  const [deadline, setDeadline] = useState()

  useEffect(() => {
    // console.log(route.params.tag.Deadline)
    setDeadline(format(new Date(route.params.tag.Deadline), "yyyy-MM-dd"))
    // setDeadline("2022-12-30")
  }, [route.params.tag.deadline])

  useEffect(() => {
    let count = 0;
    data.Review.map((item) => {
      count += Number(item.content.rating).toFixed(1);
    });
    const avg = count / data.Review.length;

    setRating(avg);
  }, []);

  const setDisableHandle = () => {
    //잔여시간 0이하로 내려가면 기능 막기
    setDisable(true);
  };

  // const timeLimit = "2022-10-19";
  // const timeLimit = data?.dueDate
  //20분 가정
  const qnaOpenHandle = () => {
    setQnaReviewModalVisible((current) => !current);
  };

  return (
    <View style={styles.contain}>
      <View>
        <MainHeader />
      </View>

      <ScrollView>
        <View style={{ margin: 10 }}>
          <BaseFont style={{ fontSize: 25 }}>{data.Name}</BaseFont>
          <BaseFont>평점({rating ? rating : "0"})</BaseFont>
          {/* 남은시간 컴포넌트 */}
          <View style={styles.timerContain}>
            {/* {available === "able" ? */}
            <SetTime
              timeLimit={deadline}
              setDisableHandle={() => setDisableHandle(data?.key)}
            />
          </View>
          <Image
            source={{ uri: data?.Image }}
            style={styles.titleImageContain}
            resizeMode={"contain"}
          />
          <View style={styles.priceContain}>
            <BaseFont style={styles.priceText}>
              Standard Price ${data.Price}
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
              <BaseFont style={{ flex: 1 }}>{data.Category}</BaseFont>
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
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
              }}
            >
              <BaseFont style={{ color: "#666666", flex: 1 }}>From</BaseFont>
              <BaseFont style={{ flex: 1 }}>{data.MadeIn}</BaseFont>
            </View>
          </View>
          {/* QnA, 리뷰 띄우기 모달 */}
          <View style={{}}>
            <CustomButton
              onPress={qnaOpenHandle}
              style={styles.qnaReviewModalButton}
            >
              QnA / Review
            </CustomButton>
          </View>

          <View style={styles.detailImgContain}>
            {/* <Image
              source={{ uri: data.detailImage }}
              style={styles.detailImg}
              resizeMode={"contain"}
            /> */}
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
          // disable={disable}
          deadline={deadline}
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
    borderBottomWidth: 1,
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
  qnaReviewModalButton: {
    paddingVertical: 15,
    textAlign: "left",
    marginHorizontal: 0,
    borderRadius: 5,
  },
});

export default ItemDetailScreen;
