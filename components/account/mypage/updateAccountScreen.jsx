import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import MainHeader from "../../header";

function UpdateAccountScreen() {
    const route = useRoute();
    const [updateData, setUpdateData] = useState({});
    // console.log(route.params)
    useEffect(() => {
        if (route?.params?.id && route?.params?.email) {
            setUpdateData(current => {
                return { ...current, id: route.params.id, email: route.params.email }
            })
        }
    }, [])


    const changeHandle = (text) => {
        if(text[1]===""){
            console.log("!11")
            
        }
        setUpdateData(current => {
            return { ...current, [text[0]]: text[1] };
        })
    }

    const submitHandle = () => {
        const data = {};
        for( let value in updateData){
            if(updateData[value]==="")
            console.log(value)
            else{
                data[value]=updateData[value]
            }
        } 
        console.log(data)

    }
    return (
        <>
            <View style={styles.mainContainer} >
                <View style={styles.mainContainer}>
                    <MainHeader />
                    <Text>마이페이지</Text>
                    <Text>사용자 : {updateData?.id}</Text>
                    <Text>이메일 : {updateData?.email}</Text>
                    <TextInput

                        secureTextEntry={true}
                        onChangeText={(text) => changeHandle(["passWordNow", text])}
                        placeholder="현재비번"
                    />

                    <TextInput
                        secureTextEntry={true}
                        onChangeText={(text) => changeHandle(["newPassWord", text])}
                        placeholder="바꿀비번" />
                    <TextInput
                        secureTextEntry={true}
                        onChangeText={(text) => changeHandle(["confirmPassWord", text])}
                        placeholder="비번확인" />
                    <TextInput
                        autoCapitalize="none"
                        onChangeText={(text) => changeHandle(["question", text])}
                        placeholder="나만의질문" />
                    <TextInput
                        autoCapitalize="none"
                        onChangeText={(text) => changeHandle(["answer", text])}
                        placeholder="답변" />
                    <Button title="확인" onPress={submitHandle} />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },


})

export default UpdateAccountScreen;