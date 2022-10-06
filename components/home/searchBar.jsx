import { Button, StyleSheet, TextInput, View } from "react-native";

function SearchBar() {
    return (
        <View style={styles.mainContain}>
            <TextInput style={styles.inputContain} />
            <Button title="검색" style={styles.buttonContain} />
        </View>
    );
}
const styles = StyleSheet.create({
    mainContain: {
        flexDirection: "row",
        margin: 10,
        
    },
    inputContain: {
        flex: 2,
        borderWidth: 1,
        borderColor:"yellow"
        
    },
    buttonContain: {
        flex:1,
        margin:10    
    }
})

export default SearchBar;