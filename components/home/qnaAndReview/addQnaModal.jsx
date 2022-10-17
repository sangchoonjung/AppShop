import { useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import CustomButton from "../../../custom/customButton";
import BaseFont from "../../common/base";

function AddQnaModal({ modalVisible, setModalVisible, onSubmit }) {
  const [qnaText, setQnaText] = useState("");

  const pressHandle = () => {
    Alert.alert("Register Confrim", "Are you sure you want to register?", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          // setQnaText("")
          onSubmit(qnaText);
        },
      },
    ]);
  };

  return (
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible((current) => !current);
          }}
        >
            <View style={styles.body}>
              <BaseFont style={styles.titleFont}>
                Input Your Question{"\n"}
              </BaseFont>

              <TextInput
                onChangeText={(text) => setQnaText(text)}
                style={styles.txtInput}
              />
              <View style={{flexDirection:"row"}}>
              <CustomButton
                onPress={() => setModalVisible(false)}
                style={styles.btnStyle}
              >
                Cancel
              </CustomButton>
              <CustomButton onPress={pressHandle} style={styles.btnStyle}>
                Submit
              </CustomButton>
              </View>
            </View>
            
        </Modal>
      </KeyboardAvoidingView>
  );
}

const { height, width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  outPosition: {
    // flex: 1
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    marginTop: "auto",
    marginBottom:200,
    height: height / 2.5 < 300 ? 300 : height / 2.5,
    paddingVertical: height / 10,
    margin: width / 18,
  },
  titleFont: {
    fontSize: 20,
    textShadowColor: "blue",
    textShadowRadius: 2,
  },
  txtInput: {
    borderWidth: 1,
    borderRadius: 4,
    width: width /2,
    marginBottom: 30,
    height: 40,
    borderColor:"#999999",
    fontSize:20
  },
  btnStyle: {
    padding:20,
    marginHorizontal:10


  },
});
export default AddQnaModal;
