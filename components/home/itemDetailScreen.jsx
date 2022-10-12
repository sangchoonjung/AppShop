import { useRoute } from "@react-navigation/native";
import { Header } from "@react-navigation/stack";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BaseFont from "../../assets/font/base";
import MainHeader from "../mainheader";
import ItemBuyAndZzim from "./itemBuyAndZzim";
import SetTime from "./setTime";

function ItemDetailScreen() {
  const route = useRoute();
  const data = route.params.tag;
  // console.log(data);
  const [modalVisible, setModalVisible] = useState(false);

  const  setDisableHandle = ()=>{
    //잔여시간 0이하로 내려가면 기능 막기
  }
  const timeLimit = "2022-10-13";
  //20분 가정

  return (
    <View style={styles.contain}>
      <View>
        <MainHeader />
      </View>
      <ScrollView>
        <View>
          <BaseFont style={{ fontSize: 25 }}>{data.title}</BaseFont>
          <BaseFont>(평점)(평점갯수)</BaseFont>
          <Image
            source={{ uri: data.titleImage }}
            style={styles.titleImageContain}
            resizeMode={"contain"}
          />
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
          <View style={styles.priceContain}>
            <BaseFont style={styles.priceText}>
              Regular Price _ ${data.standardFee}
            </BaseFont>
          </View>

          <View>
            <Text>
              잔여 시간 <SetTime timeLimit={timeLimit} setDisableHandle={()=>setDisableHandle(data.key)}/>
            </Text>
            {/* 남은시간 컴포넌트 */}
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
        {/* 구매,찜하기 모달 */}
        <ItemBuyAndZzim
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          data={data}
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
    marginVertical: 15,
  },
  priceContain: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#93DAFF",
    margin: 10,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    borderColor: "#999999",
    borderWidth: 1
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
});

export default ItemDetailScreen;
