import { launchImageLibraryAsync, useMediaLibraryPermissions } from "expo-image-picker";
import { useState } from "react";
import { Alert, Button, Dimensions, Image, ScrollView, StyleSheet, TextInput, View } from "react-native";
import CustomButton from "../../../../custom/customButton";

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
    if (text > 0 && text < 6) {
        setRating(text);
      onChangeHandle(["rating", text]);
    } else {
        setRating("")
        Alert.alert("Error", "Please fill in from 1 to 5", {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        });
    }
    // setRating(text)
    
}


    return (
      <View style={{ flex: 1 }}>
        <TextInput
          onChangeText={(text) => setRatingHandle(text)}
          placeholder="Rating 1~5"
          value={rating}
          maxLength={1}
          style={sytles.textInputItem}
        />
        <CustomButton onPress={takeFromAlbum}>Upload Image</CustomButton>
        <View style={sytles.imageConatiner}>
          {imageuri && (
            <Image source={{ uri: imageuri }} style={{ height: 200 }} />
          )}
        </View>
      </View>
    );
}
const { width, height } = Dimensions.get("screen");
// console.log(width, height)
const sytles = StyleSheet.create({
    imageConatiner: {
        height: 220,
        width: width - 100,
        borderWidth: 1,
        borderColor:"#999999"
    },
    textInputItem: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginBottom: 10,
    padding: 5
  },
})
export default ImagePicker;