import { useState } from "react";
import { Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../../../custom/customButton";
import QuestionPicker from "./questionPicker";

function SetNewPassWord({ onClose, visible, passWordResetHandle }) {
  const [id, setId] = useState("");

  const [pwView,setPwView]=useState(true);
  const [qna, setQna] = useState({
    question: "place",
    answer: ""
  });
  const [passWord, setPassWord] = useState("");


  const find = () => {
    // console.log(id,qna,passWord);
    if(passWord.length===0||qna.answer.length===0){
      return;
    }
    passWordResetHandle(id, qna, passWord);
    setQna({
    question: "place",
    answer: ""
  });
  setPassWord("")
  setId("")

  };


  const changeHandle = (text) => {
    setQna(current => { return { ...current, [text[0]]: text[1] } });
  }
  const pwViewhandle =()=>{
    setPwView(current=>!current)
  }

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
          <View>

            <QuestionPicker changeHandle={changeHandle} />
          </View>
          <TextInput
            placeholder="Enter Your Answer"
            keyboardType="default"
            onChangeText={(text) => changeHandle(["answer",text])}
            value={qna.answer}
            style={styles.textInputContain}
          />

          <TextInput
          secureTextEntry={pwView}
            placeholder="Enter Your New Password"
            keyboardType="default"
            onChangeText={(passWord) => setPassWord(passWord)}
            value={passWord}
            style={styles.textInputContain}
          />
          <Pressable style={styles.pwViewStyle} onPress={pwViewhandle}>
          <Text style={{textAlign:"right"}}>{pwView?"View Password":"Hide Password"}</Text>
          </Pressable>
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
  pwViewStyle:{
    marginTop:-13,
    marginHorizontal:20,
    marginLeft:150,
    marginBottom:5,
    paddingRight:3
    // borderWidth:1
  }
});
export default SetNewPassWord;
