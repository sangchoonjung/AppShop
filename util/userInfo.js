//찜목록 리뷰기능 다 account나 product에 넣어도 될 것 같은데
//뭔가 애매해서 분리했습니다.
//이름이 맘에 안 드는데 변경하셔도 됩니다...


import axios from "axios"

// const baseURL = "http://192.168.4.41:8080";
// const baseURL = "http://58.125.70.41:8080";
const baseURL = "http://192.168.4.127:8080";
//설정값이 localhost나 128.0.0.1로 설정하면 Network Error 떠서 테스트 하실 때 자기 ip로 해주세요


//찜 요청
export async function sendFavRequest(id, userId) {
    //게시물 아이디 , 사용자 아이디 (둘 다 유일값 가정)
    try {
        const response = await axios.post(baseURL + "/api/userinfo/zzim", {
            "zzim": id,
            "user": userId
        });

        return response.data

    } catch (e) {
        console.log(e.message)

    }
}