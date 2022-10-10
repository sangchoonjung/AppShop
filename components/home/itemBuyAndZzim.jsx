import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import BaseFont from "../../assets/font/base";
import { Entypo } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/auth";
function ItemBuyAndZzim({modalVisible,setModalVisible,data}) {
    const [heartOnOff,setHeartOnOff]=useState(false);
    const [productCount,setProductCount] =useState(1);

    const ctx = useContext(AppContext)
    const zzimList = ctx.userInfo.data.zzimList
    console.log(zzimList,data.key)

  /*
  초기세팅
  계정에 있는 zzimList에 이 항목이 있으면 true
  */
  useEffect(()=>{
        if (zzimList?.includes(data.key)) {
        setHeartOnOff(true);
        }
  },[])



    
    const countHandlerUp=()=>{
        setProductCount(productCount+1);
    }
    const countHandlerDown=()=>{
        setProductCount(productCount-1);
    }

    const modalConfirmButton=()=>{
        Alert.alert(
            "Buy Confirm",
            "Do you really want to register for purchase?",
            [
            {text:"Cancel",
            onPress:()=>console.log("cancel pressed"),
            style:"cancel"},
            {text:"OK",
            onPress:()=>console.log("OK pressed")}    
            ]   
        )
    }

    const heartHandler=()=>{
        console.log("트루")
        if(heartOnOff){
        setHeartOnOff(false);
        }else{
        setHeartOnOff(true);
        }
    }



    return (
        <>
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={()=>{
            setModalVisible(!modalVisible)
          }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>
                <BaseFont style={styles.modalProductName}>{data.title}</BaseFont>
                <View style={{flexDirection:"row",justifyContent:"center"}}>
                <BaseFont style={{fontSize:20}}>count _ </BaseFont>
                <Text style={styles.modalcount} onPress={countHandlerDown}>-</Text>
                <BaseFont style={{fontSize:20}}>{productCount}</BaseFont>
                <Text style={styles.modalcount} onPress={countHandlerUp}>+</Text>
                </View>
                <BaseFont style={styles.modalTotalPrice}>total price _ {data.standardFee*productCount}</BaseFont>
                </View>
                {/* 모달 버튼 */}
                <View style={styles.modalButtonContain}>
                <Pressable
                  style={[styles.button,styles.modelButton]}
                  onPress={modalConfirmButton}
                >
                  <Text style={styles.textStyle}>confirm</Text>
                </Pressable>
                <Pressable
                  style={[styles.button,styles.modelButton]}
                  onPress={() =>{
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text style={styles.textStyle}>cancel</Text>
                </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          
          {/* 모달 띄우기 */}
          <View style={styles.blockLayout}>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <BaseFont style={styles.textStyle}>buy item</BaseFont>
          </Pressable>
          {/* 찜 on/off */}
          <Pressable style={styles.heartLayout}>
           <Entypo name={heartOnOff?"heart":"heart-outlined"} size={24} color="black" onPress={heartHandler}/>
          
          </Pressable>
          </View>
          </>
    );
}
const styles =StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop:200,
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
        elevation: 5
      },
      button: {
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "green",
        paddingHorizontal:130,
        justifyContent:"center",
        alignItems:"center"
      },
      buttonClose: {
        backgroundColor: "green",
      },
      textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 20,
        textAlign:"center"
      },
      blockLayout:{
        flexDirection:"row"
      },
      heartLayout:{
        justifyContent:"center",      
        backgroundColor:"red",
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      },
      modalcount:{
        fontSize:15,
        backgroundColor:"#CCCCCC",
        borderRadius:2,
        borderWidth:1,
        paddingHorizontal:10,
        marginHorizontal:10
      },
      modalProductName:{
        fontSize:20,
        marginBottom:20,
        justifyContent:"center"
      },
      modalTotalPrice:{
        fontSize:25,
        marginTop:20,
        textAlign:"center",
        
      },
      modalButtonContain:{
        flexDirection:"row",
        marginTop:20
      },
      modelButton:{
        marginHorizontal:10,
        backgroundColor:"green",
        borderRadius:10
      }

})

export default ItemBuyAndZzim;