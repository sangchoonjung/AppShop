import { useRoute } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import MainHeader from "../../header";

function UpdateAccountScreen() {
    const route = useRoute();
    const submitHandle = ()=>{
        
    }
    return (
        <>
            <View style={styles.mainContainer} >
                <View style={styles.mainContainer}>
                    <MainHeader />
                    <Text>마이페이지</Text>
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