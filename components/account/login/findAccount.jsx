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
        <View style={styles.modalContainer}>
          <BaseFont style={{ fontSize: 20, textAlign: "center" }}>
            Please enter your email
          </BaseFont>
          <TextInput
            placeholder="Enter Your Email"
            keyboardType="default"
            onChangeText={(email) => setEmail(email)}
            value={email}
            style={styles.textInputContain}
          />
          <CustomButton style={{ marginTop: 20 }} onPress={onClose}>
            Cancel
          </CustomButton>
          <CustomButton onPress={find}>Confirm</CustomButton>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    padding: 50,
    backgroundColor: "white",
    justifyContent: "center",
    height: 400,
    marginTop: 200,
    width: "100%",
    margin: "auto",
    opacity: 0.9,
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
