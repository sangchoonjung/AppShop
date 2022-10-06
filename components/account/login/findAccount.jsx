import { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";


function FindAccount({ onClose, getAccount, visible}) {

    const [email, setEmail] = useState("");

    const find = ()=>{
        setEmail("");
        getAccount(email)
    }
    return ( 
        <>
        <Modal  visible={visible} animationType={"slide"} transparent={true}>
            <View style={styles.modalContainer}>
                <Text>이메일을 입력해 주세요</Text>
                <TextInput placeholder="Enter Your Email" keyboardType="default" 
                    onChangeText={email => setEmail(email)} value={email}
                />
                <View>

                    <Button title="취소" onPress={()=> onClose()}/>
                    <Button title="찾기" onPress={find} />
                </View>
            </View>
        </Modal>
        </>
     );
}

const styles = StyleSheet.create({
    modalContainer:{
        padding:50 , backgroundColor:"gray" ,
        justifyContent: "center",
        // height : "70%",
        margin : "auto",
        opacity:0.9


    }
})
export default FindAccount;