import { useContext } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../../context/auth";
import ItemDetailQnaAndReviewTabView from "./itemDetailQnaAndReviewTabView";
function QnaReviewModal({ setModalVisible, modalVisible, data }) {
  // const ctx = useContext(AppContext)

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible((current) => !current);
        }}
      >
        <Pressable
          onPress={() => setModalVisible((current) => !current)}
          style={{ flex: 1, backgroundColor: "#000", opacity: 0.5 }}
        />
        <View style={styles.modalItem}>
          <ItemDetailQnaAndReviewTabView data={data} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalItem:{
    flex:1,
    marginTop:"auto",
    marginBottom:49,
  }
});
export default QnaReviewModal;
