import { Image, Text } from "react-native";

function QnaAndReview({item}) {

    return ( <>
    {/* <Text>{item?._id}</Text> */}
    <Text>리뷰제목 : {item?.content.title}</Text>
    <Text>리뷰내용 : {item?.content.main}</Text>
    <Text>별점 : {item?.content.rating}</Text>
    <Text>이미지</Text>
    {item?.imgData&&<Image style={{height:200}} source={{uri:"data:image/png;base64,"+item?.imgData}}/>}
    </> );
}

export default QnaAndReview;