import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { sendRegisterRequest } from "../../../util/account";
import MainHeader from "../../header";

function JoinScreen() {
  const [registData, setRegistData] = useState({
    id: "",
    passWord: "",
    confirmPassWord: "",
    email: "",
    birth: "",
    question: "",
    answer: "",
  });
  const changeHandle = (text) => {
    setRegistData((current) => {
      return { ...current, [text[0]]: text[1] };
    });
  };

  const submitHandle = () => {
    console.log(registData);
    sendRegisterRequest(registData);
  };

  const confirmId = () => {};
  return (
    <>
      <View>
        <MainHeader back={true} />
      </View>
      <View>
        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => changeHandle(["id", text])}
          placeholder="id"
          style={{}}
        />
        <Button title="아디중복화깅ㄴ" onPress={confirmId} />
        <TextInput
          onChangeText={(text) => changeHandle(["passWord", text])}
          secureTextEntry={true}
          placeholder="passWord"
          style={{}}
        />
        <TextInput
          onChangeText={(text) => changeHandle(["confirmPassWord", text])}
          secureTextEntry={true}
          placeholder="confirm"
          style={{}}
        />
        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => changeHandle(["email", text])}
          placeholder="email"
          style={{}}
        />
        <TextInput
          maxLength={8}
          keyboardType="number-pad"
          autoCapitalize="none"
          onChangeText={(text) => changeHandle(["birth", text])}
          placeholder="birth"
          style={{}}
        />
        <TextInput placeholder="질문 선택(임시)" />
        <TextInput
          autoCapitalize="none"
          onChangeText={(text) => changeHandle(["answer", text])}
          placeholder="answer"
          style={{}}
        />
        {/* select를 위한 모듈 설치 필요 */}
        <Button title="임시 서브밋" onPress={submitHandle} />
      </View>
    </>
  );
}

const sytles = StyleSheet.create({});
export default JoinScreen;
