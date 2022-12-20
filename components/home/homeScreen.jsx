import { CurrentRenderContext } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../context/auth";
import {
  categoryFilteredProduct,
  requestAllProduct,
  searchFilteredProduct,
} from "../../util/product";
import Loading from "../common/loading";
import { Ionicons } from "@expo/vector-icons";
import MainHeader from "../mainheader";
import Header from "../mainheader";
import Category from "./category";
import List from "./list";
import SearchBar from "./searchBar";

function HomeScreen() {
  const [itemList, setItemList] = useState(null);
  const [filter, setFilter] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const ctx = useContext(AppContext);

  useEffect(() => {
    ctx.setLoading(true);
    requestAllProduct()
      .then((p) => {
        if (p) {
          setItemList(p.message);
          // console.log(p);
        }
      })
      .catch((e) => console.log(e.message))
      .finally(() => {
        ctx.setLoading(false);
      });
  }, []);

  console.log(itemList);
  useEffect(() => {
    if (!(searchKeyword === "")) {
      return;
    }
    //예외처리

    if (filter?.length >= 1) {
      ctx.setLoading(true);
      categoryFilteredProduct(filter)
        .then((p) => setItemList(p?.message))
        .finally(() => {
          ctx.setLoading(false);
        })
        .catch((e) => console.log(e.message));
    }

    if (filter?.length === 0) {
      //필터 제거하면 전체목록
      //모든 값 제거했을 때(빈 필터) 약간의 로딩 딜레이 있음(나중에 스피너)
      ctx.setLoading(true);

      requestAllProduct()
        .then((p) => {
          if (p) {
            setItemList(p.message);
          }
        })
        .catch((e) => console.log(e.message))
        .finally(() => {
          ctx.setLoading(false);
        });
    }

    ctx.setLoading(false);
  }, [filter]);

  const searchHandle = (keyword) => {
    // console.log(keyword,"Keyword")
    if (keyword === "") {
      return;
    }
    setFilter([]);
    searchFilteredProduct(keyword).then((e) => setItemList(e.message));
  };

  return (
    <View style={{ flex: 1 }}>
      <MainHeader back={true} />
      <View style={styles.boxContain}>
        <SearchBar
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          searchHandle={searchHandle}
        />
        <Category
          setSearchKeyword={setSearchKeyword}
          filter={filter}
          setFilter={setFilter}
        />
      </View>
      <List item={itemList} filter={filter} />
      <Loading visible={ctx.loading} />
    </View>
  );
}
const styles = StyleSheet.create({
  boxContain: {
    paddingBottom: 15,
    backgroundColor: "#B4FBFF",
  },
});
export default HomeScreen;
