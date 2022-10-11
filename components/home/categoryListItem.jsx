import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

function CategoryListItem({ filter, onPress, title }) {
    const [defaults, setDefaults] = useState(styles.default);
    //스타일 설정
    useEffect(() => {
        if (filter?.includes(title)) {
            setDefaults(styles.picked);
        } else {
            setDefaults(styles.default);
        }
    }, [filter])



    return (
        <>
            <View >
                <Pressable style={({ pressed }) => pressed
                    ? styles.pressed
                    :
                    defaults
                } onPress={onPress}>
                    <Text>{title}</Text>
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    pressed: {
        marginHorizontal: 1,
        backgroundColor: "gray"
    },
    picked: {
        opacity: 0.5
    }
})

export default CategoryListItem;