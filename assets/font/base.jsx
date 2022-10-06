import { StyleSheet, Text, View } from "react-native";

function BaseFont({children,style}) {
    
    return (
            <Text style={[styles.base,style]}>{children}</Text>
    );
}
const styles = StyleSheet.create({
  base: {
    fontFamily: "baseFont",
  },
});

export default BaseFont;