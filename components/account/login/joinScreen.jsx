import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import CustomButton from "../../../custom/customButton";
import { sendIdCheck, sendRegisterRequest } from "../../../util/account";
import MainHeader from "../../mainheader";
import QuestionPicker from "./questionPicker";

function JoinScreen({  }) {
  const navigation = useNavigation()
  const [registData, setRegistData] = useState({
    id: "",
    passWord: "",
    confirmPassWord: "",
    email: "",
    birth: "",
    question: "place",
    answer: "",
  });
  const changeHandle = (text) => {
    setRegistData((current) => {
      return { ...current, [text[0]]: text[1] };
    });
  };

  const submitHandle = async () => {
    console.log(registData);
    const rst = await sendRegisterRequest(registData);
    console.log(rst)
    if (rst.result) {
      Alert.alert("system", "complete!", [
        {
          text: "ok",
          onPress: () => {
            navigation.navigate("loginScreen")
          }
        }
      ])
    }
    if (rst?.result === false && rst?.message) {
      Alert.alert("error", rst.message);
    }
  }
  console.log(registData)

  const checkId = async () => {
    // console.log(registData.id)

    try {
      if (!registData.id) {
        return;
      }
      const response = await sendIdCheck(registData.id);
      console.log(response);

      if (response) {
        Alert.alert("퍼퓸", "사용가능");
      } else {
        Alert.alert("퍼퓸", "사용불가");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <MainHeader back={true} />
      <View style={sytles.contain}>
        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => changeHandle(["id", text])}
          placeholder="id"
          style={[sytles.textinputContain, { marginBottom: 2 }]}
        />
        <CustomButton onPress={checkId} style={sytles.checkButton}>
          Check
        </CustomButton>

        <View>
          <TextInput
            onChangeText={(text) => changeHandle(["passWord", text])}
            secureTextEntry={true}
            placeholder="password"
            style={sytles.textinputContain}
          />
          <TextInput
            onChangeText={(text) => changeHandle(["confirmPassWord", text])}
            secureTextEntry={true}
            placeholder="confirm"
            style={sytles.textinputContain}
          />
          <TextInput
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => changeHandle(["email", text])}
            placeholder="email"
            style={sytles.textinputContain}
          />
          <TextInput
            maxLength={8}
            keyboardType="number-pad"
            autoCapitalize="none"
            onChangeText={(text) => changeHandle(["birth", text])}
            placeholder="birth"
            style={sytles.textinputContain}
          />
          <QuestionPicker changeHandle={changeHandle}/>
          <TextInput
            autoCapitalize="none"
            onChangeText={(text) => changeHandle(["answer", text])}
            placeholder="answer"
            style={sytles.textinputContain}
          />
        </View>
      </View>
      <View>
        <CustomButton onPress={submitHandle}>Submit</CustomButton>
      </View>
    </>
  );
}

const sytles = StyleSheet.create({
  contain: {
    margin: 20,
    marginHorizontal: 30,
    borderWidth: 1,
    padding: 20,
    borderColor: "#cccccc"

  },
  checkButton: {
    fontSize: 20,
    marginHorizontal: 10

  },
  textinputContain: {
    borderWidth: 1,
    padding: 5,
    fontSize: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 2,
    borderColor: "#cccccc"
  },
});
export default JoinScreen;
