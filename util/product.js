import axios from "axios"

// const baseURL = "http://192.168.4.41:8080";
const baseURL = "http://58.125.70.41:8080";
// const baseURL = "http://192.168.4.127:8080";
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
