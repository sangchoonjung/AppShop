import axios from "axios";

const { baseURL } = require("./baseURL");
// import products from "../data/data-dummy";

//전체 아이템리스트 요청 (완)
export async function requestAllProduct() {
  try {
    const response = await axios.post(
      baseURL + "/api/product/allProductList",
      {}
    );

    return response.data;
  } catch (e) {
    console.log(e.message);
  }
}

//카테고리 선택 요청 (완)
export async function categoryFilteredProduct(category) {
  try {
    const response = await axios.post(
      baseURL + "/api/product/categoryProductList",
      {
        category: category,
      }
    );
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
}
//검색 요청 (완)
export async function searchFilteredProduct(keyword) {
  try {
    console.log(keyword);
    const response = await axios.post(
      baseURL + "/api/product/searchProductList",
      {
        search: keyword,
      }
    );
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
}
//찜 한 리스트 불러오기
export async function requestZzimProduct(token, zzimList) {
  //   console.log(token, zzimList);
  try {
    const response = await axios.post(
      baseURL + "/api/product/zzimProductList",
      {
        zzimList: zzimList,
      },
      { headers: { "x-access-token": token } }
    );
    console.log(response.data, "ssssssssss");
    return response.data;
  } catch (e) {
    console.log(e.message);
  }

  //   try {
  //     const response = await fetch(`${baseURL} + "/api/product/zzimProductList`, {
  //       method: "POST",
  //       body: {
  //         zzimList: zzimList,
  //         token: token,
  //       },
  //       headers: { "Content-type": "application/json" },
  //     });
  //     console.log(response.data);
  //     //   return response.data;
  //   } catch (e) {
  //     console.log(e.message);
  //   }
}

// 찜이랑 팬딩이랑 하나의 경로에 보내도 될 것 같은데 리팩토링할 시간 있으면 고치고
// 일단은 그냥 분리
export async function requestPendingProductList(productId) {
  try {
    const response = await axios.post(
      baseURL + "/api/product/requestProductList",
      {
        list: productId,
        type: "pending",
      }
    );
    // console.log(response.data)
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
}

export async function requestCompleteProductList(productId) {
  try {
    const response = await axios.post(
      baseURL + "/api/product/requestProductListComplete",
      {
        list: productId,
        type: "complete",
      }
    );
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
}

export async function requestAddQna(qna, productId, userId) {
  try {
    // console.log(qna,productId,userId)
    const response = await axios.post(baseURL + "/api/product/requestQnaAdd", {
      qna: qna,
      productId: productId,
      userId: userId,
    });
    if (response.data) {
      return response.data;
    }
  } catch (e) {
    console.log(e.message);
  }
}
