import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import BaseFont from "../../../assets/font/base";
import BaseHeader from "../../../custom/baseHeader";
import CustomButton from "../../../custom/customButton";
import { MaterialIcons } from "@expo/vector-icons";
import { updateAccountRequest } from "../../../util/account";
import { AppContext } from "../../../context/auth";
import QuestionPicker from "../login/questionPicker";

function UpdateAccountScreen() {
    const ctx = useContext(AppContext);
  const route = useRoute();
  const [updateData, setUpdateData] = useState({});
  const navigation = useNavigation()
  // console.log(route.params)
  useEffect(() => {
    if (route?.params?.id && route?.params?.email) {
      setUpdateData((current) => {
        return { ...current, id: route.params.id, email: route.params.email };
      });
    }
  }, []);

  const changeHandle = (text) => {
    if (text[1] === "") {
      console.log("!텍스트 비어있음");
    }
    setUpdateData((current) => {
      return { ...current, [text[0]]: text[1] };
    });
  };

  const submitHandle = async () => {
    const data = {};
    //입력을 했다가 지워버리면 값이 "" 으로 변해서 불필요한 정보가 넘어가길래 수정
    for (let value in updateData) {
      if (updateData[value] === "") {
        console.log(value);
      } else {
        data[value] = updateData[value];
      }
    }
    const rst = await updateAccountRequest(data);
    console.log(rst,"rst")
    if (rst) {
      Alert.alert("Ok", "바뀜")
      navigation.goBack();
    } else {
      Alert.alert("Error", "Error!");
    }
    console.log(data);
    };
    const logOutHandle = () => {
        ctx.logout();
    }
    
  return (
    <>
      <View style={styles.mainContainer}>
        <BaseHeader>Manage my information</BaseHeader>
        <View style={styles.mainContainer}>
          <View style={styles.logout}>
            <BaseFont style={{ fontSize: 30, flex: 1, marginLeft: 15 }}>
              {updateData?.id}
            </BaseFont>
            <CustomButton style={styles.logoutButton} onPress={logOutHandle}>
              <MaterialIcons name="logout" size={20} color="black" />
            </CustomButton>
          </View>
          <View>
            <BaseFont style={styles.accountHeader}>
              Account Information
            </BaseFont>
          </View>
          <View style={styles.informationData}>
            <Text style={styles.data}>E-mail _ {updateData?.email}</Text>
            <TextInput
              secureTextEntry={true}
              onChangeText={(text) => changeHandle(["passWordNow", text])}
              placeholder="Current Password"
              style={styles.data}
            />

            <TextInput
              secureTextEntry={true}
              onChangeText={(text) => changeHandle(["newPassWord", text])}
              placeholder="Change Password"
              style={styles.data}
            />
            <TextInput
              secureTextEntry={true}
              onChangeText={(text) => changeHandle(["confirmPassWord", text])}
              placeholder="Confirm Password"
              style={styles.data}
            />

            <QuestionPicker changeHandle={changeHandle} />

            <TextInput
              autoCapitalize="none"
              onChangeText={(text) => changeHandle(["answer", text])}
              placeholder="My Answer"
              style={styles.data}
            />
          </View>
          <CustomButton onPress={submitHandle}>Verify</CustomButton>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  logout: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    margin: 20,
    borderRadius: 5,
    borderColor: "#999999",
  },
  logoutButton: {
    paddingHorizontal: 15,
    marginRight: 20,
  },
  accountHeader: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: "#999999",
    marginHorizontal: 20,
    paddingBottom: 10,
  },
  informationData: {
    marginLeft: 30,
    marginVertical: 20,
  },
  data: {
    marginBottom: 5,
    borderBottomWidth: 1,
    marginRight: 30,
    paddingTop: 5,
    borderBottomColor: "#999999",
  },
});

export default UpdateAccountScreen;
