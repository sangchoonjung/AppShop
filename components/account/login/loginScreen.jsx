import {
  setNewPassWordRequest,
  findIdByEmail,
  sendLoginRequest,
} from "../../../util/account";

import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AppContext } from "../../../context/auth";
import MainHeader from "../../mainheader";
import FindAccount from "./findAccount";
import SetNewPassWord from "./setNewPassWord";
import CustomButton from "../../../custom/customButton";
import BaseFont from "../../../assets/font/base";
import Loading from "../../common/loading";

//해야할거 로그인context에 맞게 수정 네비게이션 (회원가입 아디비번찾기)연결 나머지는 서버작업

function LoginScreen({ navigation }) {
  const [loginData, setLoginData] = useState({ id: "", passWord: "" });

  const [modal, setModal] = useState(false);
  const [modalPW, setModalPW] = useState(false);

  const [pwView, setPwView] = useState(true);

  const ctx = useContext(AppContext);
  const navi = useNavigation();

  const changeHandle = (text) => {
    setLoginData((current) => {
      return { ...current, [text[0]]: text[1] };
    });
  };

  //로그인 이벤트
  const loginHandle = async () => {
    if (loginData.id.length < 1 || loginData.passWord.length < 1) {
      return;
      //아이디 비밀번호 최소글자 설정 필요
    }
    try {
      ctx.setLoading(true);
      const recv = await sendLoginRequest(loginData.id, loginData.passWord);
      // 로그인한후 인증 셋팅
      if (recv?.result) {
        console.log(recv.message);
        ctx.login(
          recv.message.id,
          recv.token,
          recv.message.email,
          recv.message
        );
        Alert.alert("confirm", "환영합니다!");
        navi.navigate("home");
      } else {
        Alert.alert("warning", "id 또는 password가 틀렸습니다.");
      }
    } catch (e) {
      console.log(e.message);
      Alert.alert("warning", "ERROR!!!");
    } finally {
      ctx.setLoading(false);
    }
  };

  const onClose = () => {
    setModal((current) => !current);
  };

  const onClosePW = () => {
    setModalPW((current) => !current);
  };
  const findAccount = async (email) => {
    try {
      const rst = await findIdByEmail(email);
      console.log(rst);
      setModal((current) => !current);
      if (rst?.result) {
        Alert.alert("APPSHOP", `회원님의 아이디는 ${rst.id} 입니다.`);
      }
    } catch (e) {
      Alert.alert("warning", "잘못된 이메일입니다.");
    }
  };

  const passWordResetHandle = async (id, answer, newpassWord) => {
    try {
      // console.log(id,answer,passWord)

      const rst = await setNewPassWordRequest(id, answer, newpassWord);
      console.log(rst);
      if (!rst) {
        Alert.alert("warning", "정보를 기입해주세요.");
      } else {
        setModalPW(false);
        Alert.alert("complete", "처리완료!");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const registerHandle = () => {
    navigation.navigate("join");
  };

  //   console.log(loginData.id.length, loginData.passWord);
  return (
    <View style={{ flex: 1 }}>
      <MainHeader back={true} />

      <View>
        <View style={styles.loginContain}>
          <View style={styles.textInputContain}>
            <TextInput
              value={loginData.id}
              autoCapitalize="none"
              onChangeText={(text) => changeHandle(["id", text])}
              placeholder="id"
              style={styles.textInputItem}
            />
            <TextInput
              secureTextEntry={pwView}
              value={loginData.passWord}
              onChangeText={(text) => changeHandle(["passWord", text])}
              placeholder="password"
              style={styles.textInputItem}
            />
            <Pressable onPress={() => setPwView((current) => !current)}>
              <Text>{pwView ? "비번보기" : "비번숨기기"}</Text>
            </Pressable>
          </View>
          <View>
            <CustomButton onPress={loginHandle} style={{ marginTop: 25 }}>
              로그인
            </CustomButton>

            <Pressable
              onPress={onClosePW}
              style={({ pressed }) => [
                styles.forgotContain,
                pressed ? { opacity: 0.6 } : null,
              ]}
            >
              <BaseFont>비밀번호를 잃어버렸나요?</BaseFont>
            </Pressable>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.forgotContain,
                pressed ? { opacity: 0.6 } : null,
              ]}
            >
              <BaseFont>아이디를 잃어버렸나요?</BaseFont>
            </Pressable>
          </View>
        </View>
        {/* 세컨박스 (가입하기) */}
        <View style={styles.joinContain}>
          <BaseFont>계정이 없으신가요?</BaseFont>
          <Pressable
            onPress={registerHandle}
            style={({ pressed }) => (pressed ? { opacity: 0.6 } : null)}
          >
            <BaseFont style={{ color: "#006699", fontWeight: "bold" }}>
              가입하기
            </BaseFont>
          </Pressable>
        </View>

        <FindAccount
          onClose={onClose}
          visible={modal}
          getAccount={findAccount}
        />

        <SetNewPassWord
          onClose={onClosePW}
          visible={modalPW}
          passWordResetHandle={passWordResetHandle}
        />
      </View>
      <Loading visible={ctx.loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContain: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  textInputItem: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginBottom: 10,
    padding: 5,
  },
  forgotContain: {
    marginTop: 25,
    alignItems: "center",
  },
  joinContain: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 30,
    margin: 20,
    marginTop: 1,
  },
  loginContain: {
    borderWidth: 1,
    borderColor: "#cccccc",
    margin: 20,
    paddingVertical: 20,
  },
});
export default LoginScreen;
