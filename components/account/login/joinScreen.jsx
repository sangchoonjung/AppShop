import { useState } from "react";

import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { sendIdCheck, sendRegisterRequest } from "../../../util/account";
import MainHeader from "../../mainheader";

function JoinScreen({navigation}) {
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

  const submitHandle = async () => {
    console.log(registData);
    const rst = await sendRegisterRequest(registData);
    console.log(rst)
    if(rst.result){
      Alert.alert("system","complete!",[
        {
          text:"ok",
          onPress : ()=>{
            navigation.navigate("login")
          }
        }
      ])
    }
    if(rst?.result===false&&rst?.message){
      Alert.alert("error",rst.message);
    }
  }

  const checkId = async () => {
    // console.log(registData.id)

    try {
      if (!registData.id) {
        return;
      }
      const response = await sendIdCheck(registData.id);
      console.log(response)

      if (response) {
        Alert.alert("퍼퓸", "사용가능")
      } else {
        Alert.alert("퍼퓸", "사용불가")
      }
    } catch (e) {
      console.log(e.message)
    }
  }

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
        <Button title="아디중복화깅ㄴ" onPress={checkId} />
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

const sytles = StyleSheet.create({

});
export default JoinScreen;
