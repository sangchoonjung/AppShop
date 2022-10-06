import { findIdByEmail, sendLoginRequest } from "../../../util/account";

import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AppContext } from "../../../context/auth";
import MainHeader from "../../header";
import FindAccount from "./findAccount";
//해야할거 로그인context에 맞게 수정 네비게이션 (회원가입 아디비번찾기)연결 나머지는 서버작업

function LoginScreen({ navigation }) {
    const [loginData, setLoginData] = useState({ id: "", passWord: "" });

    const [modal, setModal] = useState(false)

    const ctx = useContext(AppContext);
    const navi = useNavigation();
   



  const changeHandle = (text) => {
    setLoginData((current) => {
      return { ...current, [text[0]]: text[1] };
    });
  };

  const loginHandle = async () => {
    if (loginData.id.length < 1 || loginData.passWord.length < 1) {
      return;
      //아이디 비밀번호 최소글자 설정 필요
      }
      
      const recv = await sendLoginRequest(loginData.id, loginData.passWord);
    // 로그인한후 인증 셋팅
      console.log(recv.result)
      if (recv.result) {
          ctx.login(recv.message.id, recv.token,recv.email);
          Alert.alert("confirm", "환영합니다!")
          navi.navigate("home");
      } else {
          Alert.alert("warning","id 또는 password가 틀렸습니다.")
      }
    };


    const onClose = () => {
        setModal(current => !current);
    }
    const findAccount = async (email)=>{
        
        const rst = await findIdByEmail(email);
        console.log(rst)
        setModal(current => !current);
        if(rst?.result){
            Alert.alert("test",`Your ID is ${rst.id}`)
        }
    }

    const passWordReset = () => {

    }




  const registerHandle = () => {
    navigation.navigate("join");
  };


//   console.log(loginData.id.length, loginData.passWord);
  return (
    <>
      <View>
        <MainHeader />
      </View>
      <View>
        <TextInput
          value={{}}
          autoCapitalize="none"
          onChangeText={(text) => changeHandle(["id", text])}
          placeholder="아이디"
        />
        <TextInput
          secureTextEntry={true}
          value={{}}
          onChangeText={(text) => changeHandle(["passWord", text])}
          placeholder="비밀번호"
        />
        <Button title="임시로그인버튼" onPress={loginHandle} />
        <Button title="회원가입" onPress={registerHandle} />
        <Button title="구글로그인위치" />
        <Button title="아디비번찾기" onPress={findAccount} />
        
                <Button title="아디찾기" onPress={onClose} />
                <Button title="비번재설정" onPress={passWordReset} />
             <FindAccount onClose={onClose} visible={modal} getAccount={findAccount}  />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
export default LoginScreen;
