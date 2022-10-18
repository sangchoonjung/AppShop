import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

function QuestionPicker({ changeHandle }) {
    const [selected, setSelected] = useState("place");

    return (
        <>
            <Text style={{ textAlign: "center" }}>Choose you Question.</Text>
            <Picker
                style={style.mainContain}
                mode='dropdown'
                selectedValue={selected}
                onValueChange={(itemValue, itemIndex) => {
                    changeHandle(["question", itemValue])
                    setSelected(itemValue)
                }
                }>
                <Picker.Item label="기억에 남는 추억의 장소는?" value="place"/>
                <Picker.Item label="자신의 인생 좌우명은?" value="motto" />
                <Picker.Item label="받았던 선물 중 기억에 남는 독특한 선물은?" value="gift" />
                <Picker.Item label="인상 깊게 읽은 책 이름은?" value="book" />
                <Picker.Item label="다시 태어나면 되고 싶은 것은?" value="rebirth" />
                <Picker.Item label="초등학교 때 기억에 남는 짝꿍 이름은?" value="friend" />
                <Picker.Item label="읽은 책 중에서 좋아하는 구절이 있다면?" value="paragraph" />
                <Picker.Item label="어린 시절 장래희망은?" value="dream" />
            </Picker>
        </>
    );
}

const style = StyleSheet.create({
    mainContain:{
        
    }
})
export default QuestionPicker;