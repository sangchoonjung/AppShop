import { useContext } from "react";
import { Button, FlatList, View } from "react-native";
import { AppContext } from "../../../context/auth";
import QnaAndReview from "./qnaAndReview";

function QnaAndReviewList({ item,type }) {

    // const ctx = useContext(AppContext``);

const qnaAddHandle = ()=>{

}

    return (
        <>
            <View style={{ flex: 1 }}>
                {type==="qna"&&<>
                <Button title="question add" onPress={qnaAddHandle}/>
                </>}
                <FlatList
                    data={item}
                    renderItem={({ item }) => <QnaAndReview item={item} key={item?.reviewDate} />}
                    showsVerticalScrollIndicator={false} />
            </View>
        </>
    );
}

export default QnaAndReviewList;