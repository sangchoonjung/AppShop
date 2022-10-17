import axios from "axios"



const {baseURL} = require("./baseURL")


import products from "../data/data-dummy";

export async function requestAllProduct() {
    try {

        const response = await axios.post(baseURL + "/api/product/allProductList", {

        })
        // console.log(response.data)
        return response.data
    } catch (e) {
        console.log(e.message)
    }
}


export async function categoryFilteredProduct(category) {

    try {
        const response = await axios.post(baseURL + "/api/product/categoryProductList",
            {
                category : category
            }
        )
        return response.data
    } catch (e) {
        console.log(e.message);
    }
}

export async function searchFilteredProduct(keyword){
    try {
        console.log(keyword)
        const response = await axios.post(baseURL + "/api/product/searchProductList",
            {
                search : keyword
            }
        )
        return response.data
    } catch (e) {
        console.log(e.message);
    }
}


export async function requestZzimProduct(zzimList){

    try {
        // console.log(zzimList,"zzimlllistrequest")
        const response = await axios.post(baseURL + "/api/product/zzimProductList",
            {
                zzimList : zzimList
            }
        )
        // console.log(response.data)
        return response.data
    } catch (e) {
        console.log(e.message);
    }


}
// 찜이랑 팬딩이랑 하나의 경로에 보내도 될 것 같은데 리팩토링할 시간 있으면 고치고
// 일단은 그냥 분리
export async function requestPendingProductList(productId){
    try {
        const response = await axios.post(baseURL + "/api/product/requestProductList",
            {
                list : productId,
                type:"pending"
            }
            )
            // console.log(response.data)
        return response.data
    } catch (e) {
        console.log(e.message);
    }
}


export async function requestCompleteProductList(productId){
    try {
        const response = await axios.post(baseURL + "/api/product/requestProductListComplete",
            {
                list : productId,
                type:"complete"
            }
        )
        return response.data
    } catch (e) {
        console.log(e.message);
    }
}



export async function requestAddQna(qna,productId,userId){
    try {
        // console.log(qna,productId,userId)
        const response = await axios.post(baseURL + "/api/product/requestQnaAdd",
            {
                qna : qna,
                productId:productId,
                userId:userId
            }
        )
        return response.data
    } catch (e) {
        console.log(e.message);
    }
}
//평점 가져오기(수정중)
export async function requestRating(productId) {
    try {
        // console.log(qna,productId,userId)
        const response = await axios.post(baseURL + "/api/product/requestProductReview",
            {
                productId: productId,
            }
        )
        return response.data
    } catch (e) {
        console.log(e.message);
    }
}