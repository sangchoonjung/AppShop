import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

function SearchBar({searchHandle,searchKeyword,setSearchKeyword}) {
    

    // console.log(filter)

    return (
        <View style={styles.mainContain}>
            <TextInput value={searchKeyword} onChangeText={(text)=>setSearchKeyword(text)} style={styles.inputContain} />
            <Button onPress={()=>searchHandle(searchKeyword)} title="검색" style={styles.buttonContain} />
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
        borderColor:"yellow",
        paddingLeft:10
        
    },
    buttonContain: {
        flex:1,
        margin:10    
    }
})

export default SearchBar;