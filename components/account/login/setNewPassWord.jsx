import { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";


function SetNewPassWord({onClose,visible,passWordResetHandle}) {
    const [id, setId] = useState("");
    const [answer, setAnswer] = useState("");
    const [passWord,setPassWord] = useState("")
    const find = ()=>{
        // setAnswer("");
        passWordResetHandle(id,answer,passWord);
    }

    return (
        <>
            <Modal visible={visible} animationType={"slide"} transparent={true}>
                <View style={styles.modalContainer}>

                <Text>아이디를 입력해 주세요.</Text>
                <TextInput placeholder="Enter Your ID" keyboardType="default"
                        onChangeText={id => setId(id)} value={id}
                    />

                    <Text>대충질문선택위치</Text>
                    <Text>답변을 입력해 주세요.</Text>
                    <TextInput placeholder="Enter Your Answer" keyboardType="default"
                        onChangeText={answer => setAnswer(answer)} value={answer}
                    />
                    <Text>새로운 비밀번호를 입력해 주세요.</Text>
                    <TextInput placeholder="Enter Your New Password" keyboardType="default"
                        onChangeText={passWord => setPassWord(passWord)} value={passWord}
                    />
                    <View>
                        <Button title="취소" onPress={() => onClose()} />
                        <Button title="찾기" onPress={find} />
                    </View>
                </View>
            </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    modalContainer: {
        padding: 50, backgroundColor: "gray",
        justifyContent: "center",
        // height : "70%",
        margin: "auto",
        opacity: 0.9
    }
})
export default SetNewPassWord;