//찜목록 리뷰기능 다 account나 product에 넣어도 될 것 같은데
//뭔가 애매해서 분리했습니다.
//이름이 맘에 안 드는데 변경하셔도 됩니다...


import axios from "axios"

const {baseURL} = require("./baseURL")



//찜 요청
export async function sendZzimUpdateRequest(userId,zzimList) {
    //게시물 아이디 , 사용자 아이디 (둘 다 유일값 가정)
    try {
        const response = await axios.post(baseURL + "/api/userinfo/zzim", {
            "user": userId,
            "zzimList":zzimList
        });

        return response.data

    } catch (e) {
        console.log(e.message)

    }
}