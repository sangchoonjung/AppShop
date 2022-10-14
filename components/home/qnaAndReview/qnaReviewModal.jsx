import { useContext } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../../context/auth";
import ItemDetailQnaAndReviewTabView from "./itemDetailQnaAndReviewTabView"
function QnaReviewModal({setModalVisible,modalVisible,data}) {


    // const ctx = useContext(AppContext)

    return (<>
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
        setModalVisible(current => !current);
    }}
    >

<Pressable onPress={()=>setModalVisible(current=>!current)} style={styles.centeredView}>
{/* <Text>test</Text> */}
</Pressable>
<>
<ItemDetailQnaAndReviewTabView data={data}/>
{/* 탭뷰를 뷰 안에 넣으면 동작하지 않음 */}
{/* 스타일 조정 어떻게 해요...? */}
</>

    </Modal>
    </>);
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 130,
    },
    // modalView: {
    //     margin: 20,
    //     backgroundColor: "white",
    //     borderRadius: 10,
    //     padding: 40,
    //     alignItems: "center",
    //     shadowColor: "#000",
    //     shadowOpacity: 0.5,
    //     shadowRadius: 4,
    //     elevation: 5,
    // },
    // button: {
    //     padding: 10,
    //     elevation: 2,
    // },
    // buttonOpen: {
    //     backgroundColor: "#006699",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     paddingVertical: 15,
    //     flex: 1,
    // },
    // buttonClose: {
    //     backgroundColor: "green",
    // },
    // textStyle: {
    //     color: "black",
    //     fontWeight: "bold",
    //     textAlign: "center",
    // },
    // modalText: {
    //     marginBottom: 20,
    //     textAlign: "center",
    // },
    // blockLayout: {
    //     flexDirection: "row",
    //     width: "100%"
    // },
    // heartLayout: {
    //     justifyContent: "center",
    //     backgroundColor: "#A5D8FA",
    //     justifyContent: "center",
    //     paddingHorizontal: 15
    // },
    // modalcount: {
    //     fontSize: 15,
    //     backgroundColor: "#CCCCCC",
    //     borderRadius: 2,
    //     borderWidth: 1,
    //     paddingHorizontal: 10,
    //     marginHorizontal: 10,
    // },
    // modalProductName: {
    //     fontSize: 20,
    //     marginBottom: 20,
    //     justifyContent: "center",
    // },
    // modalTotalPrice: {
    //     fontSize: 25,
    //     marginTop: 20,
    //     textAlign: "center",
    // },
    // modalButtonContain: {
    //     flexDirection: "row",
    //     marginTop: 20,
    // },
    // modelButton: {
    //     marginHorizontal: 10,
    //     backgroundColor: "green",
    //     borderRadius: 10,
    // },
});
export default QnaReviewModal;