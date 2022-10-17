import { Image, Text } from "react-native";
import { dateCutting } from "../../../util/function";

function QnaAndReview({ item, type }) {
    if (type === "qna") {
        const newd = dateCutting(item.questionDate)
        return (<>
            <Text>상태 : {item?.type ? "답변 완료" : "미답변"}</Text>
            <Text>Q. {item?.question}</Text>
            <Text>A. {item.answer && <Text>{item.answer}</Text>}</Text>
            <Text>{newd + "\n"}</Text>
        </>)
    }
    return (<>
        {/* <Text>{item?._id}</Text> */}

        <Text>리뷰제목 : {item?.content?.title}</Text>
        <Text>리뷰내용 : {item?.content?.main}</Text>
        <Text>별점 : {item?.content?.rating}</Text>
        <Text>이미지</Text>
        {item?.imgData && <Image style={{ height: 200 }} source={{ uri: "data:image/png;base64," + item?.imgData }} />}
    </>);
}

export default QnaAndReview;