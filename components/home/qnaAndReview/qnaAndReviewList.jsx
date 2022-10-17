import { useContext, useState } from "react";
import { Button, FlatList, View } from "react-native";
import { AppContext } from "../../../context/auth";
import CustomButton from "../../../custom/customButton";
import { requestAddQna } from "../../../util/product";
import AddQnaModal from "./addQnaModal";
import QnaAndReview from "./qnaAndReview";

function QnaAndReviewList({ item, type, data }) {
  const [qnaModalOpen, setQnaModalOpen] = useState(false);
  const ctx = useContext(AppContext);

  const qnaAddOpenHandle = () => {
    setQnaModalOpen((current) => !current);
  };

  const addQnaRequestHandle = async (qna) => {
    if (qna === "") {
      return;
    }
    try {
      console.log(data.key);
      const respone = await requestAddQna(qna, data.key, ctx.auth.id);

      // 리턴값으로 after document 받아서 list에 updateOne 해주기
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {type === "qna" && (
          <CustomButton onPress={qnaAddOpenHandle}>Question Add</CustomButton>
      )}
      <FlatList
        data={item}
        renderItem={({ item }) => (
          <QnaAndReview item={item} key={item?.reviewDate} />
        )}
        showsVerticalScrollIndicator={false}
      />
      <AddQnaModal
        onSubmit={addQnaRequestHandle}
        modalVisible={qnaModalOpen}
        setModalVisible={setQnaModalOpen}
      />
    </View>
  );
}

export default QnaAndReviewList;
