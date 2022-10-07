import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import CategoryListItem from "./categoryListItem";

function Category({ filter, setFilter }) {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        function readCategory() {
            const { categoryList } = require("../../data/data-dummy")
            return categoryList
        };
        //서버에서 받아오기 or 미리 입력된 값 읽어오기
        const list = readCategory();
        setCategory(list);
    }, []);

    const filterhandle = (e) => {
        console.log(e)
        filter.includes(e) ?
            setFilter(current => current.filter(item => item !== e))
            :
            setFilter(current => [...current, e])
    }


    // console.log(category)
    return (
        <>
            <Text>카테고리 컨포넌트!</Text>
            <View style={styles.scrollContainer}>

                <ScrollView horizontal={true} >
                    {category.map(e => 
                    <CategoryListItem onPress={() => filterhandle(e)} key={e} title={e} />
                    )}
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 1
    }
})

export default Category;