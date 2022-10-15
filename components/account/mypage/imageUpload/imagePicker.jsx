import { launchImageLibraryAsync, useMediaLibraryPermissions } from "expo-image-picker";
import { useState } from "react";
import { Alert, Button, Dimensions, Image, StyleSheet, TextInput, View } from "react-native";

function ImagePicker({ onPicked, onChangeHandle }) {
    const [mediaStatus, requestMediaPermission] = useMediaLibraryPermissions();


    const [imageuri, setImageuri] = useState(null);
    const [rating, setRating] = useState();

    const takeFromAlbum = async () => {
        try {

            // console.log(mediaStatus)
            if (!mediaStatus.granted) {
                const resp = await requestMediaPermission();
                if (!resp.granted) {
                    Alert.alert("퍼퓸", "Access denied!");
                    return;
                };
            }
            const result = await launchImageLibraryAsync({
                quality: 0.7,
                allowsEditing: true,
                aspect: [16, 9],
                exif: true,
                base64: true,
            });
            if (result) {
                // console.log(result)
                setImageuri(result.uri);
                onPicked(result?.uri, result?.base64);
            }
        } catch (e) {
            console.log(e.message);
            Alert.alert("퍼퓸", "Error")
        }

    }

const setRatingHandle =(text)=>{
//입력값을 5?기준점까지만 막을 필요가 있음 아직안했음...
    onChangeHandle(["rating",text])
    // setRating(text)
    
}


    return (
        <>
            <Button title="이미지선택(임시)" onPress={takeFromAlbum} />
            <TextInput onChangeText={(text)=>setRatingHandle(text)} placeholder="Rating 1~5" value={rating} maxLength={1} />
            <View style={sytles.imageConatiner}>
                {imageuri && <Image source={{ uri: imageuri }} style={{ flex: 1 }} />}
            </View>

        </>
    );
}
const { width, height } = Dimensions.get("screen");
// console.log(width, height)
const sytles = StyleSheet.create({
    imageConatiner: {
        height: (height / 6),
        width: width - 100
    }
})
export default ImagePicker;