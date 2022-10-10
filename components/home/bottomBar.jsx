import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../context/auth";
import { sendFavRequest } from "../../util/userInfo";

function BottomBar({ id }) {

    const navigation = useNavigation()
    const [defaults, setDefaults] = useState(styles.default);
    //스타일 설정
    // console.log(id)
    //id값이 유일값이라는 가정

    const ctx = useContext(AppContext)
    // console.log(ctx.userInfo.data)
    //찜이랑 리뷰 이것저것 하려면 유저 데이터 필요해서 컨텍스트에 올렸습니다
    
    // console.log(ctx.auth.id)
    useEffect(() => {
        if (ctx.userInfo.zzimList?.includes(id)) {
            setDefaults(styles.picked);
        } else {
            setDefaults(styles.default);
        }
    }, [])

    
    const favHandle = () => {
        if (!ctx.auth) {
            navigation.navigate("account")
        }
        sendFavRequest(id,ctx.auth.id)
    }

    return (
        <>
            <View style={styles.footer}>
                <Pressable style={({ pressed }) => pressed
                    ? styles.pressed
                    :
                    defaults
                }
                    onPress={favHandle}>
                    <Text>이ㅓ거누르면찜</Text>
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        // backgroundColor:"black"
    }, pressed: {
        marginHorizontal: 1,
        backgroundColor: "gray"
    },
    picked:{
        opacity:0.5
    }
})
export default BottomBar;