import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../context/auth";
import {
  categoryFilteredProduct,
  requestAllProduct,
  searchFilteredProduct,
} from "../../util/product";
import Loading from "../common/loading";
import MainHeader from "../mainheader";
import Category from "./category";
import List from "./list";
import SearchBar from "./searchBar";

function HomeScreen() {
  const [itemList, setItemList] = useState(null);
  const [filter, setFilter] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const ctx = useContext(AppContext);

  //전체 아이템 불러오기
  useEffect(() => {
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
  }, [ctx.pendingList]);

  //필터링 검색 불러오기
  useEffect(() => {
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

  //서치바 검색 핸들러
  const searchHandle = (keyword) => {
    // console.log(keyword,"Keyword")
    if (keyword == "") {
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
    setFilter([]);
    searchFilteredProduct(keyword).then((e) => {
      console.log(e);
      setItemList(e.message);
    });
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
