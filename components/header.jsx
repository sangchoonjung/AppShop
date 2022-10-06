import { Button, StyleSheet, Text, View } from "react-native";
import BaseFont from "../assets/font/base";

function MainHeader({back}) {
    return (
        <View style={styles.main}>
            
            <BaseFont style={{fontSize:20}}>Beauty Shop</BaseFont>
        </View>
    );
}
const styles = StyleSheet.create({
    main: {
        width: "100 %",
        height: 80,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
    }
})

export default MainHeader;