import { useState } from "react";
import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import BaseFont from "../../../assets/font/base";
import CustomButton from "../../../custom/customButton";

function FindAccount({ onClose, getAccount, visible }) {
  const [email, setEmail] = useState("");

  const find = () => {
    setEmail("");
    getAccount(email);
  };
  return (
    <>
      <Modal visible={visible} animationType={"slide"} transparent={true}>
        {/* 바깥쪽 눌렀을때 나가게 하기 */}
        <Pressable
          style={{ flex: 1, backgroundColor: "#000", opacity: 0.2 }}
          onPress={onClose}
        />
        <View style={styles.modalContainer}>
          <BaseFont
            style={{ fontSize: 20, textAlign: "center", paddingBottom: 10 }}
          >
            가입 당시 이메일
          </BaseFont>
          <TextInput
            placeholder="이메일"
            keyboardType="default"
            onChangeText={(email) => setEmail(email)}
            value={email}
            style={styles.textInputContain}
          />

          <CustomButton onPress={find}>Confirm</CustomButton>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    height: 300,
    width: "100%",
    marginTop: "auto",
    marginBottom: 50,
  },
  textInputContain: {
    textAlign: "center",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 5,
    marginHorizontal: 20,
  },
});
export default FindAccount;
