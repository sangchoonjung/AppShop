import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

function CustomButton({ children, onPress, style,textStyle }) {
    return (
        <Pressable onPress={onPress}
            style=
            {({ pressed }) =>
                pressed ? [styles.buttonOuter]
                    : ""}>
            <View 
            style={[styles.buttonContainer, style]}>
                <Text style={[styles.buttonText,textStyle]}>
                    {children}
                </Text>
            </View>
        </Pressable>
    );
;}

const styles = StyleSheet.create({
    buttonOuter: {
        opacity: 0.5
    },
    buttonContainer: {
        backgroundColor: "black",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 8,
        opacity: 0.95,
        elevation: 1,
        borderWidth: 2,
        borderColor: "#222222",
        alignContent:"center",
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center"
    },
    buttonText: {
        color: "white",
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold"
    }
});
export default CustomButton;