import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";


function BaseHeader({ back,children }) {
  const navigation = useNavigation();

  const goBackHandle = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.main}>
      {/* {!back && (
        <Button onPress={goBackHandle} title="back" style={styles.button} />
      )} */}
      {/* 화살표 아이콘?으로 대체하고 위치조정 필요 */}
      <Text>{children}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    width: "100 %",
    height: 80,
    backgroundColor: "#A5D8FA",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,

    //---------------------------
    flexDirection: "row",
  },
  button: {},
});

export default BaseHeader;
