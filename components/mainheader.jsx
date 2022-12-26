import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import BaseFont from "../assets/font/base";
import { Ionicons } from "@expo/vector-icons";
function MainHeader({ back }) {
  const navigation = useNavigation();

  const goBackHandle = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.main}>
      {back && (
        <View>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color="#006699"
            onPress={goBackHandle}
          />
        </View>
      )}

      <View>
        <BaseFont style={{ fontSize: 20 }}>Beauty Shop</BaseFont>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    width: "100 %",
    height: 80,
    backgroundColor: "#A5D8FA",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainHeader;
