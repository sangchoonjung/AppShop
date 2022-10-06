import { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../../context/auth";
import MainHeader from "../../header";

function MypageScreen() {
    const ctx = useContext(AppContext);
    const logoutHandle = () => {
        return ctx.logout();
    }
    return (
      <View style={{flex:1}}>
        <View style={styles.mainContain}>
          <MainHeader />
          <Text>마이페이지</Text>
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