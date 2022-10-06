import { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../../context/auth";
import MainHeader from "../../header";

function MypageScreen({navigation}) {

    const ctx = useContext(AppContext);

    const logoutHandle = () => {
        return ctx.logout();
    }
    console.log(ctx)
    const updateNavigationHandle =()=>{
      navigation.navigate("update", {id:ctx.auth.id,email:ctx.auth.email})
    }

    return (




      <View style={{flex:1}}>
        <View style={styles.mainContain}>
          <MainHeader />
          <Text>프로필 수정</Text>
          <Button title="수정하기" onPress={updateNavigationHandle} />
        </View>
        <View style={styles.logoutContain}>
          <Button title="logout" onPress={logoutHandle} />
        </View>
      </View>

    );
}
const styles = StyleSheet.create({
    mainContain: {
        flex:1
    },
    logoutContain: {
        flexDirection: "row",
        justifyContent: "flex-end",
        margin:30
    }

})

export default MypageScreen;