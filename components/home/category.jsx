import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import CategoryListItem from "./categoryListItem";


function Category({ filter, setFilter, setSearchKeyword }) {


  const [category, setCategory] = useState([]);
  useEffect(() => {
    function readCategory() {
      const { categoryList } = require("../../data/data-dummy")
      return categoryList
    };
    const list = readCategory();
    setCategory(list);
  }, []);


  const filterhandle = (e) => {
    // console.log(e)
    setSearchKeyword("");
    filter?.includes(e)
      ? setFilter((current) => current.filter((item) => item !== e))
      : setFilter((current) => [...current, e]);
  };

  // console.log(category)
  return (
    <View style={styles.scrollContainer}>
      <ScrollView horizontal={true} style={{ paddingHorizontal: 20 }} showsHorizontalScrollIndicator={false}>
        {category.map((e) => (
          <CategoryListItem
            filter={filter}
            onPress={() => filterhandle(e)}
            key={e}
            title={e}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 1,
  },
});

export default Category;
