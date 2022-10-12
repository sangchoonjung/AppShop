import { useState } from "react";
import { Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../../../custom/customButton";

function SetNewPassWord({ onClose, visible, passWordResetHandle }) {
  const [id, setId] = useState("");
  const [answer, setAnswer] = useState("");
  const [passWord, setPassWord] = useState("");
  const find = () => {
    setAnswer("");
    passWordResetHandle(id, answer, passWord);
  };

  return (
    <>
      <Modal visible={visible} animationType={"slide"} transparent={true}>
        <Pressable
          style={{ flex: 1, backgroundColor: "#000", opacity: 0.2 }}
          onPress={onClose}
        />
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Enter Your ID"
            keyboardType="default"
            onChangeText={(id) => setId(id)}
            value={id}
            style={styles.textInputContain}
          />
          <Text>대충질문선택위치</Text>
          <TextInput
            placeholder="Enter Your Answer"
            keyboardType="default"
            onChangeText={(answer) => setAnswer(answer)}
            value={answer}
            style={styles.textInputContain}
          />

          <TextInput
            placeholder="Enter Your New Password"
            keyboardType="default"
            onChangeText={(passWord) => setPassWord(passWord)}
            value={passWord}
            style={styles.textInputContain}
          />
          <View>
            <CustomButton onPress={onClose}>Cancel</CustomButton>
            <CustomButton onPress={find}>Confirm</CustomButton>
          </View>
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
    marginTop: "auto",
    marginBottom: 50

  },
  textInputContain: {
    textAlign: "center",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 5,
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
export default SetNewPassWord;
