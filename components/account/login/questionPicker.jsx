import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Text } from 'react-native';

function QuestionPicker() {
    const [selected, setSelected] = useState("Choose you Question");

    return (
        <>
        <Text style={{textAlign:"center"}}>Choose you Question.</Text>
            <Picker
                selectedValue={selected}
                onValueChange={(itemValue, itemIndex) =>
                    setSelected(itemValue)
                }>
                <Picker.Item label="장래희망은?" value="장래희망" />
                <Picker.Item label="인생목표는?" value="인생목표" />
            </Picker>
        </>
    );
}

export default QuestionPicker;