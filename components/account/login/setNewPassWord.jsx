import { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CustomButton from "../../../custom/customButton";
import QuestionPicker from "./questionPicker";

function SetNewPassWord({ onClose, visible, passWordResetHandle }) {
  const [id, setId] = useState("");
  const [passWord, setPassWord] = useState("");
  const [pwView, setPwView] = useState(true);
  const [qna, setQna] = useState({
    question: "place",
    answer: "",
  });

  const find = () => {
    // console.log(id,qna,passWord);
    if (passWord.length === 0 || qna.answer.length === 0) {
      return;
    }
    passWordResetHandle(id, qna, passWord);
    setQna({
      question: "place",
      answer: "",
    });
    setId("");
    setPassWord("");
  };

  const changeHandle = (text) => {
    console.log(text[0]);
    setQna((current) => {
      return { ...current, [text[0]]: text[1] };
    });
  };
  const pwViewhandle = () => {
    setPwView((current) => !current);
  };
  // console.log(qna, "큐앤에이");

  return (
    <>
      <Modal visible={visible} animationType={"slide"} transparent={true}>
        <Pressable
          style={{ flex: 1, backgroundColor: "#000", opacity: 0.2 }}
          onPress={onClose}
        />
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="아이디"
            keyboardType="default"
            onChangeText={(id) => setId(id)}
            value={id}
            style={styles.textInputContain}
          />
          <View>
            <QuestionPicker changeHandle={changeHandle} />
          </View>
          <TextInput
            placeholder="Enter Your Answer"
            keyboardType="default"
            onChangeText={(text) => changeHandle(["answer", text])}
            value={qna.answer}
            style={styles.textInputContain}
          />

          <TextInput
            secureTextEntry={pwView}
            placeholder="새 비밀번호"
            keyboardType="default"
            onChangeText={(passWord) => setPassWord(passWord)}
            value={passWord}
            style={styles.textInputContain}
          />
          <Pressable style={styles.pwViewStyle} onPress={pwViewhandle}>
            <Text style={{ textAlign: "right" }}>
              {pwView ? "비번 보이기" : "비번 숨기기"}
            </Text>
          </Pressable>
          <View>
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
    marginBottom: 50,
  },
  textInputContain: {
    textAlign: "center",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 5,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  pwViewStyle: {
    marginTop: -10,
    marginBottom: 10,
  },
});
export default SetNewPassWord;
