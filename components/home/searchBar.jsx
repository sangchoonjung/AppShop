import { Button, StyleSheet, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
function SearchBar({ searchHandle, searchKeyword, setSearchKeyword }) {
  return (
    <View style={styles.mainContain}>
      <TextInput
        value={searchKeyword}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
        style={styles.inputContain}
      />
      <FontAwesome
        name="search"
        size={24}
        color="black"
        onPress={() => searchHandle(searchKeyword)}
        style={styles.button}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainContain: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: "white",
    padding: 7,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#999999",
  },
  inputContain: {
    flex: 1,
    paddingVertical: 3,
  },
  button: {
    marginRight: 10,
  },
});

export default SearchBar;
