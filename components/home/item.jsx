import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function Item({data}) {

    const navigation = useNavigation();

    const detailNavigation = ()=>{
        navigation.navigate("detail")
    }
    return ( 
        <>
        <View style={styles.itemContainer}>
        
        <Text>No. {data.key}</Text>
        <Text>{data.title}</Text>
        <Text>From : {data.from}</Text>
        <Text>Delivery method : {data["Delivery method"]}</Text>
        <Text>StandardFee : {data.standardFee}</Text>

        <Pressable onPress={detailNavigation}>
            {/* pressable 영역 조절 필요 */}
        <Image source={{uri:data.titleImage}} style={styles.titleImage}/>        
        </Pressable>

        </View>
        </>
     );
}


const styles = StyleSheet.create({
    itemContainer:{

    },
    titleImage:{
        height:200
    }
})
export default Item;