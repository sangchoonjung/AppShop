import { useContext, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

import BaseFont from "../../../assets/font/base";
import { AppContext } from "../../../context/auth";
import CustomButton from "../../../custom/customButton";
import { sendUploadReviewRequest } from "../../../util/userInfo";
import ImagePicker from "../../account/mypage/imageUpload/imagePicker";

function ReviewModal({
  reiviewModalOpen,
  setReiviewModalOpen,
  data,
  refreshOneProduct,
}) {
  // console.log(data)
  const [uploadImage, setUploadImage] = useState(null);
  const [uploadImageBase64, setUploadImageBase64] = useState(null);

  const [content, setContent] = useState({
    productId: data.key,
    title: "",
    main: "",
    rating: "",
  });
  const ctx = useContext(AppContext);

  const reviewSubmitHandle = async () => {
    if (!ctx.auth) {
      return;
    }
    if (
      content?.title?.length === 0 ||
      content?.main?.length === 0 ||
      content?.rating?.length === 0
    ) {
      Alert.alert("퍼퓸", "Please wirte the message.");
    } else if (uploadImage?.length === 0 || uploadImageBase64?.length === 0) {
      Alert.alert("퍼퓸", "Please upload the photo.");
    }
    try {
      const response = await sendUploadReviewRequest(
        content,
        uploadImage,
        ctx.auth,
        ctx.completeList
      );
      // console.log(response);
      ctx.setCompleteReviewList(response.message.completeReview);
      refreshOneProduct(response.updateProduct);
      // if (response) {
      //   Alert.alert("Beauty Shop", "Complete!");
      // } else {
      //   Alert.alert("Beauty Shop", "Error!");
      // }
    } catch (e) {
      console.log(e.message);
    } finally {
      setReiviewModalOpen(false);
    }
  };

  const imagePickedHandle = (uri, base64) => {
    //미리보기?
    setUploadImage(uri);
    setUploadImageBase64(base64);
  };
  // console.log(uploadImage)

  const onChangeHandle = (text) => {
    setContent((current) => {
      return { ...current, [text[0]]: text[1] };
    });
  };
  // console.log(content)

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={reiviewModalOpen}
        onRequestClose={() => {
          setReiviewModalOpen((current) => !current);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <BaseFont style={styles.modalProductName}>{data.title}</BaseFont>
            </View>

            <View style={{ flex: 1 }}>
              <TextInput
                onChangeText={(text) => onChangeHandle(["title", text])}
                placeholder="Title"
                style={styles.textInputItem}
              />
              <TextInput
                onChangeText={(text) => onChangeHandle(["main", text])}
                placeholder="One-Line-Review"
                style={styles.textInputItem}
              />
              <ImagePicker
                onPicked={imagePickedHandle}
                onChangeHandle={onChangeHandle}
              />
              <Image source={{ uri: uploadImage }} />
              {/* 이미지picker */}
            </View>

            {/* 모달 버튼 */}

            <View style={styles.modalButtonContain}>
              <CustomButton
                onPress={reviewSubmitHandle}
                style={styles.modalButton}
              >
                Submit
              </CustomButton>
              <CustomButton
                onPress={() => {
                  setReiviewModalOpen(!reiviewModalOpen);
                }}
                style={styles.modalButton}
              >
                Cancel
              </CustomButton>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
      flex: 1,
    marginBottom:50
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
    color: "black",
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
    backgroundColor: "#CCCCCC",
    borderRadius: 2,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 10,
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
  },
  textInputItem: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginBottom: 10,
    padding: 5,
  },
  modalButton: {
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
});
export default ReviewModal;
