import { useRoute } from "@react-navigation/native";
import { Header } from "@react-navigation/stack";
import { useState } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import BaseFont from "../../assets/font/base";
import MainHeader from "../mainheader";
import ItemBuyAndZzim from "./itemBuyAndZzim";
import SetTime from "./setTime";

function ItemDetailScreen() {
  const route = useRoute();
  const data = route.params.tag;
  console.log(data);
  const [modalVisible,setModalVisible] = useState(false);

  const timeLimit = 20
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
            <BaseFont>category _ {data.category}</BaseFont>
            <BaseFont>Delivery method _ {data["Delivery method"]}</BaseFont>
            <BaseFont>From _ {data.from}</BaseFont>
          </View>
          <View style={styles.priceContain}>
            <BaseFont style={styles.priceText}>
              Regular Price _ ${data.standardFee}
            </BaseFont>
          </View>

            <View>
              <SetTime timeLimit={timeLimit}/>
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
        <ItemBuyAndZzim setModalVisible={setModalVisible} modalVisible={modalVisible} data={data}/>
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
    marginVertical:15
  },
  priceContain: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "green",
    margin: 10,
    padding: 30,
    borderRadius: 20,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textContain: {
    alignItems: "center",
    marginVertical: 10,
    },
    detailImgContain: {
        elevation : 1
    },
    detailImg: {
        width: "100%",
        height:3000
        
    },
    
});

export default ItemDetailScreen;
