import { useContext, useState } from "react";
import { Alert, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import BaseFont from "../../assets/font/base";
import { AppContext } from "../../context/auth";
import { sendUploadReviewRequest } from "../../util/userInfo";
import ImagePicker from "../account/mypage/imageUpload/imagePicker";

function ReviewModal({ reiviewModalOpen, setReiviewModalOpen, data, refreshOneProduct }) {
    // console.log(data)
    const [uploadImage, setUploadImage] = useState(null);
    const [uploadImageBase64, setUploadImageBase64] = useState(null)

    const [content, setContent] = useState({
        productId: data.key,
        title: "",
        main: "",
        rating: ""
    });

    const ctx = useContext(AppContext)
    const reviewSubmitHandle = async () => {
        if (!ctx.auth) {
            return;
        }
        if (content?.title?.length === 0 || content?.main?.length === 0 || content?.rating?.length === 0) {
            return Alert.alert("퍼퓸", "Please wirte the message.");
        } else if (uploadImage?.length === 0 || uploadImageBase64?.length === 0) {
            return Alert.alert("퍼퓸", "Please upload the photo.");
        }
        try {

            const response = await sendUploadReviewRequest(content, uploadImageBase64, ctx.auth, ctx.completeList);
            console.log(response);
            ctx.setCompleteReviewList(response.message.completeReview);
            refreshOneProduct(response.updateProduct);
            if (response) {
                return Alert.alert("Beauty Shop", "Complete!");
            } else {
                return Alert.alert("Beauty Shop", "Error!");
            }
        } catch (e) {
            console.log(e)
        } finally {
            setReiviewModalOpen(false);
        }
    }


    const imagePickedHandle = (uri, base64) => {
        //미리보기?
        setUploadImage(uri);
        setUploadImageBase64(base64);
    }
    // console.log(uploadImage)

    const onChangeHandle = (text) => {
        setContent(current => { return { ...current, [text[0]]: text[1] } });
    };
    // console.log(content)

    return (<>
        <Modal
            animationType="slide"
            transparent={true}
            visible={reiviewModalOpen}
            onRequestClose={() => {
                setReiviewModalOpen(current => !current);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View>
                        <BaseFont style={styles.modalProductName}>{data.title}</BaseFont>
                    </View>

                    <View>
                        <TextInput onChangeText={(text) => onChangeHandle(["title", text])} placeholder="Title" />
                        <TextInput onChangeText={(text) => onChangeHandle(["main", text])} placeholder="One-Line-Review" />
                        <Image source={{ uri: uploadImage }} />
                        <ImagePicker onPicked={imagePickedHandle} onChangeHandle={onChangeHandle} />
                        {/* 이미지picker */}
                    </View>

                    {/* 모달 버튼 */}

                    <View style={styles.modalButtonContain}>
                        <Pressable
                            style={[styles.button, styles.modelButton]}
                            onPress={reviewSubmitHandle}
                        >
                            <Text style={styles.textStyle}> Wirte </Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.modelButton]}
                            onPress={() => {
                                setReiviewModalOpen(!reiviewModalOpen);
                            }}
                        >
                            <Text style={styles.textStyle}>cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>

        {/* 모달 띄우기 */}

    </>);
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 200,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 40,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#006699",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        flex: 1,
    },
    buttonClose: {
        backgroundColor: "green",
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 20,
        textAlign: "center",
    },
    blockLayout: {
        flexDirection: "row",
        width: "100%"
    },
    heartLayout: {
        justifyContent: "center",
        backgroundColor: "#A5D8FA",
        justifyContent: "center",
        paddingHorizontal: 15
    },
    modalcount: {
        fontSize: 15,
        backgroundColor: "#CCCCCC",
        borderRadius: 2,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginHorizontal: 10,
    },
    modalProductName: {
        fontSize: 20,
        marginBottom: 20,
        justifyContent: "center",
    },
    modalTotalPrice: {
        fontSize: 25,
        marginTop: 20,
        textAlign: "center",
    },
    modalButtonContain: {
        flexDirection: "row",
        marginTop: 20,
    },
    modelButton: {
        marginHorizontal: 10,
        backgroundColor: "green",
        borderRadius: 10,
    },
});
export default ReviewModal;