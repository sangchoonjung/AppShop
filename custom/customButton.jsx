import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import BaseFont from "../assets/font/base";

function CustomButton({ children, onPress, style,textStyle }) {
    return (
        <Pressable onPress={onPress}
            style=
            {({ pressed }) =>
                pressed ? [styles.buttonOuter]
                    : ""}>
            <View style={[styles.buttonContainer, style]}>
                <Text style={[styles.buttonText,textStyle]}>
                    {children}
                </Text>
            </View>
        </Pressable>
    );
;}

const styles = StyleSheet.create({
  buttonOuter: {
    opacity: 0.75,
  },
  buttonContainer: {
    backgroundColor: "#006699",
    borderRadius: 7,
    paddingVertical: 10,
    marginVertical: 5,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#cccccc",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginHorizontal: 30,

  },
  buttonText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "baseFont",
  },
});
export default CustomButton;