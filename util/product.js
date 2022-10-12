import axios from "axios"



// const baseURL = "http://192.168.4.41:8080";


const {baseURL} = require("./baseURL")

// const baseURL = "http://192.168.4.41:8080";
// const baseURL = "http://58.125.70.41:8080";
// const baseURL = "http://192.168.4.127:8080";
// baseURL 파일 3개 바꾸기 귀찮아서 파일 하나로 이동합니다

//설정값이 localhost나 128.0.0.1로 설정하면 Network Error 떠서 테스트 하실 때 자기 ip로 해주세요
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
        return response.data
    } catch (e) {
        console.log(e.message);
    }


}
// 찜이랑 팬딩이랑 하나의 경로에 보내도 될 것 같은데 리팩토링할 시간 있으면 고치고
// 일단은 그냥 분리
export async function requestPendingProduct(productId){
    try {
        // console.log(zzimList,"zzimlllistrequest")
        const response = await axios.post(baseURL + "/api/product/pendingProductList",
            {
                pendingList : productId
            }
        )
        return response.data
    } catch (e) {
        console.log(e.message);
    }
}