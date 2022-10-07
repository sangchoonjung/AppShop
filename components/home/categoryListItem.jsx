import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

function CategoryListItem({categoryList, onPress, title }) {
    const [defaults,setDefault] = useState("styles.default")

    useEffect(()=>{
        // categoryList.includes(title)? : 
    },[categoryList])



    return (
        <>
        <View >
            <Pressable style={({pressed})=>pressed?styles.pressed:styles.default} onPress={onPress}>
                <Text>{title}</Text>
            </Pressable>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    pressed:{
        marginHorizontal:1,
        backgroundColor:"gray"
    },
    default:{

    }
})

export default CategoryListItem;